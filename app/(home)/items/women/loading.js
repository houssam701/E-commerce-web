import React from 'react';
import { ThreeDot } from 'react-loading-indicators';

export default function LoadingPag(){
  return (
    <div className='w-full h-[100vh] flex justify-center items-center'>
    <ThreeDot variant="bounce" color="#e70026" size="medium" text="" textColor="#f10707" />
    </div>
  );
};