"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeStructureById } from "../../../store/slices/paymentSlice";
import { fetchInstitutions } from "../../../store/slices/institutionSlice";
import {
  Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
    TableCell,  
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import { Loader } from "@/components/loader";
import { useNavigate  } from "react-router-dom";

export default function PaymentListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.payment);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const { institutions } = useSelector((state) => state.institution);
    // console.log("paymentsByInstitutionId:", paymentsByInstitutionId);
    
    useEffect(() => {
        dispatch(fetchInstitutions());
  
  }, [ dispatch]);   
    return (
    <div className="p-6">
      <Card>
        <CardHeader>    
            <CardTitle className="text-2xl font-bold">Payment Status</CardTitle>
            <CardTitle className="text-sm text-gray-500">Select an institution to view payment details</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (  
            <div className="flex justify-center items-center">
                {/* <Loader /> */}
            </div>
          ) : error ? (
            <div className="text-red-600 font-medium">Error: {error}</div>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>  
                    <TableHead>Name</TableHead>
                    <TableHead>Institution Type</TableHead>
                    <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>    
                <TableBody> 
                    {institutions && institutions.length > 0 ? (
                    institutions.map((institution) => (
                        <TableRow 
                            key={institution.id}
                            onClick={() => navigate(`/payment/payments/${institution.id}`)}
                            className="cursor-pointer hover:bg-gray-100"
                        >   
                            <TableCell>{institution.name}</TableCell>
                            <TableCell>{institution.educationType.name}</TableCell>
                            <TableCell>{institution.location.name}</TableCell>
                        
                        </TableRow>
                    ))
                    ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            No institutions found.  
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
            )}  
        </CardContent>
      </Card>
    </div>
  );
}
