

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ZoneDashboard1 = () => {
  const [zones, setZones] = useState([]);
  const [zoneSlots, setZoneSlots] = useState({});
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [selectedZoneName, setSelectedZoneName] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [selectedSlotName, setSelectedSlotName] = useState("No slot selected");

  useEffect(() => {
    const area = localStorage.getItem("areaId");
    const token = localStorage.getItem("token");

    axios
      .get(`https://parkvilla.ap-south-1.elasticbeanstalk.com/api/Parkingareas/${area}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const zonesData = response.data.zones || [];
        if (!Array.isArray(zonesData)) return;

        const uniqueZones = zonesData.reduce((acc, currentZone) => {
          if (!acc.some((zone) => zone.zoneId === currentZone.zoneId)) {
            acc.push(currentZone);
          }
          return acc;
        }, []);

        setZones(uniqueZones);
        const slots = {};
        uniqueZones.forEach((zone) => {
          slots[zone.zoneId] = zone.slots || [];
        });
        setZoneSlots(slots);
      })
      .catch(() => {
        toast.error("Failed to load parking zones. Please try again.");
      });
  }, []);

  const handleZoneClick = (zoneId, zoneName) => {
    setSelectedZoneId(zoneId);
    setSelectedZoneName(zoneName);
    setSelectedSlotId(null);
    setSelectedSlotName("No slot selected");
  
    // Fixing Available Slots Calculation
    const slots = zoneSlots[zoneId] || [];
    const availableSlotCount = slots.filter(slot => slot.isOccupied === 0).length;
  
    console.log(`Total Slots: ${slots.length}, Available Slots: ${availableSlotCount}`);
  };
  

  // const handleSlotClick = (slotId, slotName) => {
  //   setSelectedSlotId(slotId);
  //   setSelectedSlotName(slotName);
  // };



  const handleSlotClick = (slotId, slotName) => {
    const token = localStorage.getItem("token");
  
    axios
      .put(`https://parkvilla.ap-south-1.elasticbeanstalk.com/api/parkingslots/occupy/${slotId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        setSelectedSlotId(slotId);
        setSelectedSlotName(slotName);
        toast.success("Slot booked successfully! It will be released after 2 hours.");
      })
      .catch(() => {
        toast.error("Failed to book slot. Please try again.");
      });
  };
  

  const BookButton = () => {
    if (!selectedSlotId || !selectedZoneId) {
      toast.error("Please select a zone and slot first");
    } else {
      localStorage.setItem("slotId", selectedSlotId);
      localStorage.setItem("slotName", selectedSlotName);
      localStorage.setItem("zoneId", selectedZoneId);
      localStorage.setItem("zoneName", selectedZoneName);
      window.location.href = "/CarDashboard";
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
      <div className="row">
        {zones.length > 0 ? (
          zones.map((zone) => {
            const { zoneId, zoneName = "Unknown Zone", totalSlots = 0 } = zone;
            const slots = zoneSlots[zoneId] || [];
            const availableSlots = slots.reduce(
              (acc, slot) => (slot.isOccupied ? acc : acc + 1),
              0
            );

            return (
              <div key={zoneId} className="col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{zoneName}</h5>
                    <p className="card-text">Total Slots: {slots.length}</p>
<p className="card-text">Available Slots: {slots.filter(slot => slot.isOccupied === 0).length}</p>

                    <button
                      className="btn btn-outline-primary mb-3"
                      onClick={() => handleZoneClick(zoneId, zoneName)}
                    >
                      Select Zone
                    </button>
                    {selectedZoneId === zoneId && (
                      <div>
                        <div className="d-flex flex-wrap gap-2">
                          {slots.length > 0 ? (
                            slots.map((slot) => (
                              <button
                                key={slot.slotId}
                                className={`btn ${slot.isOccupied ? "btn-danger" : "btn-success"} mx-1`}
                                onClick={() => handleSlotClick(slot.slotId, slot.slotName)}
                                disabled={slot.isOccupied}
                              >
                                {slot.slotName}
                              </button>
                            ))
                          ) : (
                            <p>No slots available</p>
                          )}
                        </div>
                        <p className="mt-2">Selected Slot: {selectedSlotName}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No zones found.</p>
        )}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={BookButton}>Book</button>
      </div>
    </div>
  );
};

export default ZoneDashboard1;

