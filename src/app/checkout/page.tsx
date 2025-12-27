"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, CreditCard, Truck, MapPin, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const governorates = [
    "القاهرة", "الجيزة", "الإسكندرية", "الدقهلية", "الشرقية", "المنوفية",
                                                <span>الشحن</span>
                                                <span className="text-green-400">50 ج.م</span>
                                            </div >
    <div className="flex justify-between text-2xl font-bold text-white pt-4 border-t border-white/10 mt-2">
        <span>الإجمالي الكلي</span>
        <span className="text-primary">{total + 50} <span className="text-sm font-normal text-gray-500">ج.م</span></span>
    </div>
                                        </div >
                                    </div >
                                </div >
                            </div >

    <div className="mt-12 flex justify-between items-center">
        <Button type="button" variant="ghost" size="lg" onClick={prevStep} className="px-6 text-gray-400 hover:text-white hover:bg-white/5">
            <ChevronRight className="w-5 h-5 ml-2" />
            السابق
        </Button>
        <Button type="submit" size="lg" className="px-10 h-14 text-lg bg-green-600 hover:bg-green-500 text-white border-0 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all">
            تأكيد الطلب
            <CheckCircle className="w-5 h-5 mr-2" />
        </Button>
    </div>
                        </motion.div >
                    )}
                </AnimatePresence >
            </form >
        </div >
                    </Card >
                </div >
            </div >
        </div >
    );
}
