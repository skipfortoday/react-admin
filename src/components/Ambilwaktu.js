import React from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";



const Ambilwaktu = (props) => {
  	const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update

  	React.useEffect(() => {
      const timer = setInterval(() => { // Creates an interval which will update the current data every minute
      // This will trigger a rerender every component that uses the useDate hook.
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, []);;

    const d = today.getDate();
    const m = (today.getMonth()+1) < 10 ? '0'+(today.getMonth()+1) : today.getMonth();
    const Y = today.getFullYear();

    const H = today.getHours();
    const i = today.getMinutes() < 10 ? '0'+today.getMinutes()  : today.getMinutes();
    const s = today.getSeconds();

    const fultime = Y + '/'+m+'/'+d +' '+H+':'+i+':'+s;
    return (
    	<div>{fultime}</div>
	);

}

export default Ambilwaktu;
