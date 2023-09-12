import 'moment/locale/pt-br';
import { memo } from 'react';
import Moment from 'react-moment';
import { IMessage } from '../../Interface/Interfaces';


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
          interval={ 60 * 1000 } // 1 minute
          locale='pt-br'
        />
      </div>
    </div>
  );
}


export default memo(MessageItem);