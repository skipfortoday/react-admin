import React from "react";



const Ambilwaktu = (props) => {
  	const [today, setDate] = React.useState(new Date()); // Save the current date to be able to trigger an update
    React.useEffect(() => {
      const timer = setInterval(() => { // Creates an interval which will update the current data every minute
        // This will trigger a rerender every component that uses the useDate hook.
        setDate(new Date());
        // setCounter(counter+1)
      }, 1000);
      return () => {
        clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
      }
    }, []);
    let sec = today.getSeconds();
    // console.log(sec, sec > 50 && sec < 52 && !props.isOnline)
    // if(sec%50 === 0 && !props.isOnline) { // cek per menit
    //   if(localStorage.getItem('checkConn') == null){
    //     localStorage.setItem('checkConn',1)
    //     console.log(sec,"trigger", localStorage.getItem('checkConn'))
    //     props.cek()
    //   }
    // }

    const d = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();
    const m = (today.getMonth()+1) < 10 ? '0'+(today.getMonth()+1) : today.getMonth();
    const Y = today.getFullYear();

    const H = today.getHours() < 10 ? '0'+today.getHours() : today.getHours();
    const i = today.getMinutes() < 10 ? '0'+today.getMinutes()  : today.getMinutes();
    const s = today.getSeconds() < 10 ? '0'+today.getSeconds() : today.getSeconds();

    const fultime = Y + '/'+m+'/'+d +' '+H+':'+i+':'+s;
    return (
    	<div>{fultime}</div>
	);

}

export default Ambilwaktu;
