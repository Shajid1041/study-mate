import React from 'react';
import { Grid } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex justify-center items-center min-h-[50vh]'>
            {/* <span className="loading loading-ring loading-xl"></span> */}
            <Grid
                visible={true}
                height="80"
                width="80"
                color="#7070FF"
                ariaLabel="grid-loading"
                radius="12.5"
                wrapperStyle={{}}
                wrapperClass="grid-wrapper"
            />

        </div>
    );
};

export default Loader;