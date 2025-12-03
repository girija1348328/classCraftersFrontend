"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaymentsByInstitutionId } from "../../../store/slices/paymentSlice";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PaymentListByInstitutionPage() {
  const { institution_id } = useParams();
  const dispatch = useDispatch();

    const { paymentsByInstitutionId, loading, error } = useSelector((state) => state.payment);
        console.log("paymentsByInstitutionId:", paymentsByInstitutionId);
    const payments = paymentsByInstitutionId || [];
  useEffect(() => {
    if (institution_id) {
      dispatch(fetchPaymentsByInstitutionId(institution_id));
    }
  }, [institution_id, dispatch]);

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Payment List — Institution #{institution_id}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500">Loading payments...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : payments?.data?.length === 0 ? (
            <p className="text-center text-gray-500">No payments found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Subgroup</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Fee Heads</TableHead>
                  <TableHead>Received By</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {payments?.data?.map((p) => (
                  <TableRow key={p.payment_id}>
                    <TableCell className="font-medium">{p.student_name}</TableCell>
                    <TableCell>{p.phase}</TableCell>
                    <TableCell>{p.subgroup}</TableCell>

                    <TableCell>
                      <Badge variant="outline" className="uppercase">
                        {p.mode}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          p.status === "PAID"
                            ? "bg-green-600 text-white"
                            : p.status === "PENDING"
                            ? "bg-yellow-500 text-black"
                            : "bg-red-500 text-white"
                        }
                      >
                        {p.status}
                      </Badge>
                    </TableCell>

                    <TableCell>₹{p.amount}</TableCell>
                    <TableCell>{new Date(p.payment_date).toLocaleDateString()}</TableCell>

                    <TableCell>
                      {p.payment_heads.length === 0 ? (
                        <span className="text-gray-500 text-sm">No heads</span>
                      ) : (
                        <div className="space-y-1">
                          {p.payment_heads.map((h, i) => (
                            <div key={i} className="text-sm">
                              <strong>{h.head}</strong>: ₹{h.amount}
                            </div>
                          ))}
                        </div>
                      )}
                    </TableCell>

                    <TableCell>{p.received_by}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
