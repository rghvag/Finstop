import React from 'react';
import '../css/notification.css';
import { useGlobalContext } from '../contextApi/globalContext';
import api from '../api/api';
export default function Notification() {
  const { Userprofile } = useGlobalContext();

  // const [notification, setNotification] = React.useState();
  const [notificationData, setNotificationData] = React.useState([]);

  const fetchNotification = async () => {
    const response = await api.ShowNotification();
    const response2 = await api.UnReadNotification();
    console.log(response);
    if (response) {
      setNotificationData(response.data.notification);
    }
  };
  React.useEffect(() => {
    fetchNotification();
    // const arr = ['no notification to display', 'je', 'be ready'];
    // setNotificationData(arr);
    // console.log(typeof notificationData);
  }, []);

  const DoMarkAsRead = () => {
    fetchNotification();
  };

  return (
    <React.Fragment>
      <div className='notification-container'>
        <div className='notification-container-header'>
          <div>
            Notifications &nbsp;{' '}
            {notificationData && notificationData.length > 10 ? (
              <span>10+</span>
            ) : (
              <span>{notificationData.length}</span>
            )}
          </div>

        </div>
        {notificationData &&
          notificationData.map((item) => {
            return (
              <>
                <div className='notification-container-message'>
                  {!item.isread ? (
                    <div className='notification-container-message-unread'></div>
                  ) : (
                    <></>
                  )}
                  <div className='notification-container-message-top'>
                    <img src={item.image}></img>
                    <span>{item.message}</span>
                  </div>
                  <div className='notification-container-message-bottom'>
                    {item.date_time}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </React.Fragment>
  );
}
