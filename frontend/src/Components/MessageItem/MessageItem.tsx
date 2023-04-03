import React, { memo } from 'react';
import TimeAgo from 'timeago-react';
import pt_BR from 'timeago.js/lib/lang/pt_BR';
import * as timeago from 'timeago.js';
import { IMessage } from '../../Interface/Interfaces';

function MessageItem({ userName, message, createdAt }: IMessage): JSX.Element {
  timeago.register('pt_br', pt_BR);

  return (
    <div className="message">
      <div className="name">{ userName }: </div>
      <div className="content">
        <div className="text"> { message }</div>
        <TimeAgo
          className='time'
          datetime={ createdAt }
          locale='pt_br'
          opts={ { minInterval: 60 } }
        />
      </div>
    </div>
  );
}


export default memo(MessageItem);