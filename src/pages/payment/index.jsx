import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPayments,
  fetchFeeStructureById,
} from "../../store/slices/paymentSlice";

import {
  selectPayment,
  selectPaymentLoading,
  selectFullFeeStructureById,
} from "../../store/selectors/paymentSelectors";

function FeeStructureModal({ open, onClose }) {
  const [step, setStep] = useState(1);

  const next = () => step < 4 && setStep(step + 1);
  const back = () => step > 1 && setStep(step - 1);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl p-1 rounded-2xl overflow-hidden">

        <div className="flex w-full p-3 space-x-4 ">

          {/* LEFT SIDEBAR EXACT LIKE IMAGE */}
          <div className=" m w-1/3 bg-[#496F63] text-white p-8 space-y-6 text-lg font-semibold rounded-l-2xl">
            <div>STEP 1<br />Fees Info</div>
            <div>STEP 2<br />Add-heads</div>
            <div>STEP 3<br />Installments</div>
            <div>STEP 4<br />Discounts</div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="w-2/2 p-4" >

            <DialogHeader>
              <DialogTitle className="text-2x2 font-bold">
                Fee Structure
              </DialogTitle>
              <p className="text-gray-500 text-sm">
                Please provide your name, code and description.
              </p>
            </DialogHeader>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="mt-8 space-y-3">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g Tuition Fee"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium ">Code</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g TUITION_01"
                  />
                </div>

                <div className="flex gap-2 ">
                  <select className=" w-2/2 border rounded-md h-8 px-3 text-sm">
                    <option>Select Phase</option>
                  </select>
                  <select className="w-2/2 border rounded-md h-8 px-3 text-sm">
                    <option>Select Subgroup</option>
                  </select>
                </div>

                <button
                  onClick={next}
                  className="bg-[#496F63] text-white px-6 py-2 rounded-md ml-auto block"
                >
                  Next
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <span className="bg-[#496F63] text-white px-1 py-1 rounded-md text-sm">
                    Tuition Fee ✕
                  </span>
                  <span className="bg-[#496F63] text-white px-4 py-1 rounded-md text-sm">
                    Transport Fee ✕
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g Tuition Fee"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Amount</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g 15000"
                  />
                </div>

                  <div className="flex justify-between mt-8 ">
                    <Button variant="outline" onClick={back}className="bg-[#496F63] text-white px-6 py-2 rounded-md ml-auto block">Previous</Button>
                    <Button onClick={next}
                    className="bg-[#496F63] text-white px-6 py-2 rounded-md ml-auto block"
                  >Next
                </Button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="mt-8 space-y-6">
                <div>
                  <div className="flex gap-4">
                    <span className="bg-[#496F63] text-white px-1 py-1 rounded-md text-sm">
                      Monthly ✕
                    </span>
                    <span className="bg-[#496F63] text-white px-4 py-1 rounded-md text-sm">
                      Yearly ✕
                    </span>
                </div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g Tuition Fee,Transport Fee"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Amount</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g 15000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                  />
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={back}className="bg-[#496F63] text-white px-6 py-2 rounded-md ml-auto block">Previous</Button>
                  <Button onClick={next}className="bg-[#496F63] text-white px-6 py-2 rounded-md ml-auto block"
                >Next</Button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="mt-2 space-y-6">
                <div>
                  <span className="bg-[#496F63] text-white px-1 py-1 rounded-md text-sm">
                      Monthly ✕
                    </span>
                    <span className="bg-[#496F63] text-white px-4 py-1 rounded-md text-sm">
                      Yearly ✕
                    </span>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g Tuition Fee,Transport Fee"
                  />
                </div>

                <div className="flex justify-between mt-8">
                  <div>
                  <label className="block text-sm font-medium">Description</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g 10% off for top 5 students"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Discount Type</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g Percentage"
                  />
                </div>
                </div>

                <div className="flex justify-between mt-8">
                  <div>
                  <label className="block text-sm font-medium">Amount</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3 text-sm"
                    placeholder="e.g 15000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Applies-Head-To</label>
                  <input
                    type="text"
                    className="w-full border rounded-md h-8 px-3"
                    placeholder="e.g 2"
                  />
                </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={back}className="bg-[#496F63] text-white px-6 py-2 rounded-md ml-auto block">Previous</Button>
                  <Button className="bg-[#496F63] text-white px-6 py-2 rounded-md ml-auto block">Submit</Button>
                </div>
              </div>
            )}

          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

// PAYMENT PAGE STARTS BELOW

const PaymentPage = () => {
  const dispatch = useDispatch();

  // Redux data
  const payments = useSelector(selectPayment);
  const fullStructureById = useSelector(selectFullFeeStructureById);
  const loading = useSelector(selectPaymentLoading);

  // UI states
  const [activeTab, setActiveTab] = useState("details");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // NEW: Add popup modal for + icon
  const [showAddModal, setShowAddModal] = useState(false);


  useEffect(() => {
    dispatch(fetchAllPayments());
    dispatch(fetchFeeStructureById(2));
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
     {/* HEADER */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Payment Fee Structures
            </CardTitle>

            {/* PLUS BUTTON */}
            <button
              onClick={() => setShowAddModal(true)}
              className="w-9 h-9 border rounded-md flex items-center justify-center text-xl font-bold"
            >
              +
            </button>
          </div>
        </CardHeader>
      </Card>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments?.data?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.code}</TableCell>
                <TableCell>{payment.total_amount}</TableCell>
                <TableCell>{payment.is_active ? "Yes" : "No"}</TableCell>
                <TableCell>{payment.description}</TableCell>

                <TableCell>
                  <button
                    onClick={() => {
                      setSelectedPayment(payment);
                      setShowDetailsModal(true);
                    }}
                    className="text-gray-600 hover:text-black"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


      {/* ADD MODAL (4 STEP) */}
      <FeeStructureModal open={showAddModal} onClose={setShowAddModal} />

    </div>
  );
};



export default PaymentPage;