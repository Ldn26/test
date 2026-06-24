import React from 'react'
import { ThreeDots } from 'react-loader-spinner';
function Loader() {
  return (
    <div className="flex items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#CFB53B"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader