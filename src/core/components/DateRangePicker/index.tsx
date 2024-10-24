import React from 'react';

export interface TypeDateRangePicker {}

const DateRangePickerComponent: React.FC<TypeDateRangePicker> = (props) => {
  return (
    <div className="flex max-w-max text-gray-900 rounded-md bg-gray-50 border border-gray-300 cursor-pointer">
      <div className="ps-10 p-2.5">Selected Date</div>
      <div className="ps-10 p-2.5">Selected Date</div>
    </div>
  );
};

export default DateRangePickerComponent;
