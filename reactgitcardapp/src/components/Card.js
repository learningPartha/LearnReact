import React from 'react';


class Card extends React.Component
{
    render(){
        const profile =this.props;//taking data from property passed in cardlist component
        return(
            <div className="github-profile">
                {/*Showing data from elements of test data */}
                <img src={profile.avatar_url} />
                {/*This will be the card component to show github profile*/}
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                </div>
            </div>
        );
    }
}

export default Card;