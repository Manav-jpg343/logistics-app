import "./firebase";

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "./firebase";

const db = getFirestore(app);

function Home() {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-4">Smart Logistics Optimization</h1>
      <p className="text-lg text-gray-600 mb-6">Leverage AI, IoT, Blockchain, and Data Analytics for a Sustainable Future</p>
      <Link to="/dashboard">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded">View Dashboard</Button>
      </Link>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "logistics-data"));
      setData(querySnapshot.docs.map(doc => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Logistics Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <Card key={index}>
            <CardContent>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
