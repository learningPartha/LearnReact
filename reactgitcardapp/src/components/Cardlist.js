import React from 'react';
import Card from './Card';

const Cardlist=(props)=>{
    return(
        <div>
            {/*map each element of testdata to profile and use that as parameter to Card and call for same number of elements in testdata*/}
            {props.profiles.map(profile=><Card key={profile.id} {...profile}/>)}         
        </div>
    );
}

export default Cardlist;