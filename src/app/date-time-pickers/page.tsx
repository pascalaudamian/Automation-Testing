"use client";
import React, { useState, useCallback, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Datetime from 'react-datetime';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, XCircle } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datetime/css/react-datetime.css';
import './App.css';
import moment from 'moment';

// Helper function to format date for display
const formatDate = (date: Date | null, format = 'yyyy-MM-dd HH:mm') => {
    if (!date) return 'No date selected';
    // Check if date is a valid Date object
    if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const formatted = format
            .replace('yyyy', String(year))
            .replace('MM', month)
            .replace('dd', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);

        return formatted;
    }
    return 'Invalid Date';
};

const App = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
    const [selectedDateRange, setSelectedDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [selectedTime, setSelectedTime] = useState<Date | null>(null);
    const [selectedDateAndTime, setSelectedDateAndTime] = useState<Date | null>(null);
    const [isClearable, setIsClearable] = useState(false);
    const [isClient, setIsClient] = useState(false);


    // Handle date change (date picker)
    const handleDateChange = useCallback((date: Date | null) => {
        setSelectedDate(date);
    }, []);

    // Handle date-time change (combined date and time picker)
    const handleDateTimeChange = useCallback((date: Date) => {
        setSelectedDateTime(date);
    }, []);

    // Handle date range change
    const handleDateRangeChange = useCallback((dates: [Date | null, Date | null]) => {
        setSelectedDateRange(dates);
    }, []);

    // Handle time change (using react-datetime for time-only)
    const handleTimeChange = useCallback((time: Date) => {
        setSelectedTime(time);
    }, []);

    // Handle date and time change for the combined example
    const handleDateAndTimeChange = useCallback((date: Date | null) => {
        if (date) {
            setSelectedDateAndTime(date);
        }
    }, []);

    const clearDate = () => {
        setSelectedDate(null);
    };

    const clearDateTime = () => {
        setSelectedDateTime(null);
    };

    const clearDateRange = () => {
        setSelectedDateRange([null, null]);
    };

    const clearTime = () => {
        setSelectedTime(null);
    };
    const clearCombined = () => {
        setSelectedDateAndTime(null);
    };

    useEffect(() => {
        // Set isClient to true after the component mounts on the client.
        setIsClient(true);
        // Initialize the date states only on the client.  This ensures that the
        // initial values are the same on the client.
        setSelectedDate(new Date());
        setSelectedDateTime(new Date());
        setSelectedTime(new Date());
        setSelectedDateAndTime(new Date());

    }, []);

    // Render null on the server, and the actual UI on the client.  This prevents
    // the hydration error.
    if (!isClient) {
        return null;
    }


    return (
        <div className="date-time-pickers-page">
            <Button
                variant="default"
                size="lg"
                className="title-button"
            >
                Date and Time Picker Examples
            </Button>

            {/* Basic Date Picker */}
            <div className="picker-container">
                <h2>Select a Date</h2>
                <div className="flex items-center gap-2">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        className="date-picker"
                        placeholderText="Select Date"
                        isClearable={isClearable}
                    />
                    <Button variant="outline" size="icon" onClick={clearDate} disabled={!selectedDate}>
                        <XCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                        Today
                    </Button>
                </div>
                <p>Selected Date: {formatDate(selectedDate, 'yyyy-MM-dd')}</p>
            </div>

            {/* Date and Time Picker */}
            <div className="picker-container">
                <h2>Select Date and Time</h2>
                <div className="flex items-center gap-2">
                    <Datetime
                        value={selectedDateTime || undefined}
                        onChange={(value) => {
                            if (value instanceof Date) {
                                handleDateTimeChange(value);
                            } else if (value instanceof moment) {
                                handleDateTimeChange(value.toDate());
                            }
                        }}
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        className="datetime-picker"
                        inputProps={{ placeholder: "Select Date and Time" }}
                    />
                    <Button variant="outline" size="icon" onClick={clearDateTime} disabled={!selectedDateTime}>
                        <XCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedDateTime(new Date())}>
                        Now
                    </Button>
                </div>

                <p>Selected Date & Time: {formatDate(selectedDateTime)}</p>
            </div>

            {/* Date Range Picker */}
            <div className="picker-container">
                <h2>Select a Date Range</h2>
                <div className="flex items-center gap-2">
                    <DatePicker
                        selectsRange
                        startDate={selectedDateRange[0]}
                        endDate={selectedDateRange[1]}
                        onChange={handleDateRangeChange}
                        dateFormat="yyyy-MM-dd"
                        className="date-picker"
                        placeholderText="Select Range"
                        isClearable={isClearable}
                    />
                    <Button variant="outline" size="icon" onClick={clearDateRange} disabled={!selectedDateRange[0] && !selectedDateRange[1]}>
                        <XCircle className="h-4 w-4" />
                    </Button>
                </div>
                <p>
                    Selected Range: {formatDate(selectedDateRange[0], 'yyyy-MM-dd')} -{' '}
                    {formatDate(selectedDateRange[1], 'yyyy-MM-dd')}
                </p>
            </div>

            {/* Time Picker (using react-datetime) */}
            <div className="picker-container">
                <h2>Select Time</h2>
                <div className="flex items-center gap-2">
                    <Datetime
                        value={selectedTime || undefined}
                        onChange={(value) => {
                            if (value instanceof Date) {
                                handleTimeChange(value);
                            } else if (value instanceof moment) {
                                handleTimeChange(value.toDate());
                            }
                        }}
                        dateFormat={false} // Only show time picker
                        timeFormat="HH:mm:ss"
                        className="datetime-picker"
                        inputProps={{ placeholder: "Select Time" }}
                    />
                    <Button variant="outline" size="icon" onClick={clearTime} disabled={!selectedTime}>
                        <XCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedTime(new Date())}>
                        Now
                    </Button>
                </div>
                <p>Selected Time: {formatDate(selectedTime, 'HH:mm:ss')}</p>
            </div>

            {/* Combined Date and Time Picker (using react-datepicker) */}
            <div className="picker-container">
                <h2>Select Date and Time (Combined)</h2>
                <div className="flex items-center gap-2">
                    <DatePicker
                        selected={selectedDateAndTime}
                        onChange={handleDateAndTimeChange}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="yyyy-MM-dd HH:mm"
                        className="date-picker"
                        placeholderText="Select Date and Time"
                        isClearable={isClearable}
                    />
                    <Button variant="outline" size="icon" onClick={clearCombined} disabled={!selectedDateAndTime}>
                        <XCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSelectedDateAndTime(new Date())}>
                        Now
                    </Button>
                </div>
                <p>Selected Date and Time: {formatDate(selectedDateAndTime)}</p>
            </div>
            <div className="picker-container">
                <h2>Toggle Clearable</h2>
                <label className="relative inline-flex items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isClearable}
                        onChange={() => setIsClearable(!isClearable)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Clearable
                    </span>
                </label>
            </div>
        </div>
    );
};

export default App;

