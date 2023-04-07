import React, { memo } from 'react';
import { IMessage } from '../../Interface/Interfaces';
import 'moment/locale/pt-br';
import Moment from 'react-moment';

function MessageItem({ userName, message, createdAt }: IMessage): JSX.Element {

  return (
    <div className="message">
      <div className="name">{ userName }: </div>
      <div className="content">
        <div className="text"> { message }</div>
        <Moment
          className='time'
          date={ Number(createdAt) }
          fromNow={ true }
          interval={ 60 * 1000 }
          locale='pt-br'
        />
      </div>
    </div>
  );
}


export default memo(MessageItem);