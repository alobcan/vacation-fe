import React from 'react';

import AuthContext from '../context/auth-context';
import BookingList from '../components/bookings/booking-list/booking-list';
import BookingChart from '../components/bookings/booking-chart/booking-chart';
import BookingsControls from '../components/bookings/bookings-controls/bookings-controls';
import Spinner from '../components/spinner/spinner';

class BookingsPage extends React.Component {
  state = {
    isLoading: false,
    bookings: [],
    outputType: 'list',
  };

  static contextType = AuthContext;

  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            bookings {
              _id
              createdAt
              event {
                _id
                title
                date
                price
              }
            }
          }
        `,
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        const bookings = resData.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  deleteBookingHandler = (bookingId) => {
    const requestBody = {
      query: `
          mutation cancelBook($id: ID!) {
            cancelBooking(bookingId: $id) {
              _id
              title
            }
          }
        `,
      variables: {
        id: bookingId,
      },
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return bookingId !== booking._id;
          });
          return { bookings: updatedBookings };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  outputTypeHandler = (outputType) => {
    if (outputType !== 'list') {
      this.setState({ outputType: 'chart' });
    } else {
      this.setState({ outputType: outputType });
    }
  };

  render() {
    let content = <Spinner />;
    if (!this.state.isLoading) {
      content = (
        <React.Fragment>
          <BookingsControls
            onChange={this.outputTypeHandler}
            activeOutputType={this.state.outputType}
          />
          <div>
            {this.state.outputType === 'list' ? (
              <BookingList
                bookings={this.state.bookings}
                onDelete={this.deleteBookingHandler}
              />
            ) : (
              <BookingChart bookings={this.state.bookings} />
            )}
          </div>
        </React.Fragment>
      );
    }
    return <React.Fragment>{content}</React.Fragment>;
  }
}

export default BookingsPage;
