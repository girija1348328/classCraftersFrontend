import React from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPayments, fetchFeeStructureById } from "../../store/slices/paymentSlice";
import { useEffect, useState } from "react";
import { selectPayment, selectPaymentLoading, selectFullFeeStructureById } from "../../store/selectors/paymentSelectors";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";




const PaymentPage = () => {

    const dispatch = useDispatch();
    const payments = useSelector(selectPayment);
    const fullStructureById = useSelector(selectFullFeeStructureById);
    console.log("Full Structure By ID:", fullStructureById);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // console.log("Payments in PaymentPage:", payments);
    const loading = useSelector(selectPaymentLoading);
    useEffect(() => {
        dispatch(fetchAllPayments());
        dispatch(fetchFeeStructureById(2));
    }, [dispatch]);


    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Payment Fee Structures</CardTitle>
                </CardHeader>

            </Card>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fee Structure ID</TableHead>
                            <TableHead>Structure Name</TableHead>
                            <TableHead>Code</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {/* payment?(...):(...):(...) */}
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : payments?.data && payments?.data.length > 0 ? (
                            payments?.data.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>{payment.id}</TableCell>
                                    <TableCell>{payment.name}</TableCell>
                                    <TableCell>{payment.code}</TableCell>
                                    <TableCell>{payment.total_amount}</TableCell>
                                    <TableCell>{payment.is_active ? "Yes" : "No"}</TableCell>
                                    <TableCell>{payment.description}</TableCell>

                                    <TableCell className="relative">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedPayment(payment);
                                                setShowModal(true);
                                            }}
                                            className="absolute right-9 top-2.5 text-gray-600 hover:text-black"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No payment fee structures found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Payment Details</DialogTitle>
                        <DialogDescription>
                            Fee Structure Information
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPayment ? (
                        <div className="space-y-2">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tuition Fee</TableHead>
                                        <TableHead>Currency</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    <TableRow>
                                        <TableCell>{selectedPayment.code}</TableCell>
                                        <TableCell>{selectedPayment.currency}</TableCell>
                                        <TableCell>
                                            {selectedPayment.is_active ? (
                                                <span className="text-green-600 font-medium">Active</span>
                                            ) : (
                                                <span className="text-red-600 font-medium">Inactive</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>{selectedPayment.description}</TableCell>
                                        <TableCell>{selectedPayment.total_amount}</TableCell>    
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p>No payment selected.</p>
                    )}

                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Heads</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {fullStructureById?.data?.heads && fullStructureById?.data?.heads.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                       <TableHead>Heads</TableHead>
                                    </TableHeader>  
                                    <TableBody>
                                        {fullStructureById.data.heads.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.fee_head_id}</TableCell>
                                                <TableCell>{item.is_optional ? "OPTIONAL" : "MANDATORY"}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>No fee items available.</p>
                            )}
                        </CardContent>
                    </Card>

                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Installments</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {fullStructureById?.data?.installments && fullStructureById?.data?.installments.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                       <TableRow>
                                            <TableHead>Installment Name</TableHead>
                                            <TableHead>Due Date</TableHead>
                                            <TableHead>Amount</TableHead>

                                       </TableRow>
                                    </TableHeader>  
                                    <TableBody>
                                        {fullStructureById.data.installments.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.installment_type}</TableCell>
                                                <TableCell>{item.due_date}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>No installments items available.</p>
                            )}
                        </CardContent>
                    </Card>
                    
                    <div className='flex justify-between mt-4 gap-2'>
                          <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Fine Rules</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {fullStructureById?.data?.fine_rules && fullStructureById?.data?.fine_rules.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                       {/* <TableRow>
                                            <TableHead>Installment Name</TableHead>
                                            <TableHead>Due Date</TableHead>
                                            <TableHead>Amount</TableHead>

                                       </TableRow> */}
                                    </TableHeader>  
                                    <TableBody>
                                        {fullStructureById.data.fine_rules.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.description.slice(0,7)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>No fine rules available.</p>
                            )}
                        </CardContent>
                    </Card>
                      <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Discounts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {fullStructureById?.data?.discounts && fullStructureById?.data?.discounts.length > 0 ? (
                                <Table>
                                    {/* <TableHeader> */}
                                       {/* <TableRow>
                                            <TableHead>Installment Name</TableHead>
                                            <TableHead>Due Date</TableHead>
                                            <TableHead>Amount</TableHead>

                                       </TableRow> */}
                                    {/* </TableHeader>   */}
                                    <TableBody>
                                        {fullStructureById.data.installments.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.installment_type}</TableCell>
                                                <TableCell>{item.due_date.slice(0,9)}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>No installments items available.</p>
                            )}
                        </CardContent>
                    </Card>
                    </div>
                    
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default PaymentPage;