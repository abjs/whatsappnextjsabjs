import { CircularProgress } from "@material-ui/core";

// import {Circle } from 'better-react-spinkit';
export default function Loading() {
    return (
        <center style={{
            display: "grid",
            alignItems : "center",
            justifyItems: "center",
            height: "100vh"
        }}>
            <CircularProgress/>
        </center>
    )
}
