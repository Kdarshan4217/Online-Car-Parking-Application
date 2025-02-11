

import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { useNavigate } from "react-router-dom"; // For redirection
import "bootstrap/dist/css/bootstrap.min.css";
import "./parkingReceipt.css";
import backgroundImage from "../../images/pk2.jpeg";

const styles = StyleSheet.create({
  page: { padding: 20 },
  section: { marginBottom: 10 },
  text: { fontSize: 12 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
});

const ParkingReceipt = () => {
  const [parkingData, setParkingData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setParkingData({
      areaName: localStorage.getItem("areaName"),
      zoneName: localStorage.getItem("zoneName"),
      slotName: localStorage.getItem("slotName"),
      parkingFromDate: localStorage.getItem("parkingFromDate"),
      parkingToDate: localStorage.getItem("parkingToDate"),
      parkingFromTime: localStorage.getItem("parkingFromTime"),
      parkingToTime: localStorage.getItem("parkingToTime"),
      carNo: localStorage.getItem("carNo"),
      totalAmt: localStorage.getItem("totalAmt"),
    });
  }, []);

  const handleDownload = async () => {
    const PdfDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <Text style={styles.header}>Parking Receipt</Text>
            {Object.entries(parkingData).map(([key, value]) => (
              <View key={key} style={styles.section}>
                <Text style={styles.text}>
                  {key.replace(/([A-Z])/g, " $1")}: {value}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(PdfDocument).toBlob();
    saveAs(blob, "parking_receipt.pdf");

    // Redirect to User Dashboard after download
    setTimeout(() => {
      navigate("/userDashboard");
    }, 1000);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="style">
        <center>
          <h2>Parking Receipt</h2>
        </center>
        <table className="table-bordered">
          <tbody>
            {Object.entries(parkingData).map(([key, value]) => (
              <tr key={key}>
                <td>{key.replace(/([A-Z])/g, " $1")}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <center>
          <button className="btn btn-primary" onClick={handleDownload}>
            Download Receipt & Go to Dashboard
          </button>
        </center>
      </div>
    </div>
  );
};

export default ParkingReceipt;
