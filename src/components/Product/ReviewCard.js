import React from 'react'

/*---------------------*\
 * IMPORT Components
\*---------------------*/
import profilePng from "../../images/Profile.png";


/*---------------------*\
 * IMPORT Npm
\*---------------------*/
import { Rate } from 'antd';



const ReviewCard = ({ review }) => {
    const options = {
        count: 5,
        value: review.rating,
        disabled: true,
        allowHalf: true,
    };

    return (
        <div className='reviewCard'>
            <img src={profilePng} alt='User' />
            <p>{review.name}</p>
            <Rate {...options} style={{ fontSize: '15px', marginBlock: "5px" }} />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
}

export default ReviewCard;