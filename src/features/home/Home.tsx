import React, { FC } from 'react';
import Editor from '../entry/Editor'
import Diaries from '../../features/diary/Diaries'



const Home: FC = () => {


    return (
        <div>
            <div className="two-cols">
                <div className="left" >
                
                <Diaries />
                </div>
                <div className="right"  >
                <Editor />
                </div>

            </div>





        </div>
    );
};

export default Home;
