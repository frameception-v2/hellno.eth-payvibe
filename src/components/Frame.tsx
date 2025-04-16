"use client";

import { useEffect, useCallback, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { DaimoPayButton } from "@daimo/pay";
import { Label } from "~/components/ui/label";
import { useFrameSDK } from "~/hooks/useFrameSDK";
import { baseUSDC, optimismUSDC } from "@daimo/contract";
import { getAddress } from "viem";


function PaymentComponent() {
  const [address, setAddress] = useState<`0x${string}`>(
    "0x6d9fFaede2c6CD9bb48becE230ad589e0E0D981c",
  );

  return (
    <Card className="mt-4">
      <CardHeader className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white rounded-t-lg">
        <CardTitle className="animate-pulse">MySpace Payment Zone 💫</CardTitle>
        <CardDescription className="text-white/90">Send 1 USDC on Base ✨</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="address">Recipient Address</Label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => {
              if (e.target.value.startsWith("0x")) {
                return setAddress(e.target.value as `0x${string}`);
              }
            }}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ETH address or ENS name"
          />
        </div>
        <div className="flex justify-center">
          <div className="group relative cursor-pointer">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur transition duration-1000 group-hover:opacity-100"></div>
            <div className="relative px-6 py-3 bg-black rounded-lg leading-none flex items-center">
              <DaimoPayButton
                appId="pay-demo"
                toChain={baseUSDC.chainId}
                toUnits="1.00"
                toToken={getAddress(baseUSDC.token)}
                toAddress={address}
                onPaymentStarted={(e) => console.log(e)}
                onPaymentCompleted={(e) => console.log(e)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Frame() {
  const { isSDKLoaded } = useFrameSDK();

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[300px] mx-auto py-2 px-2">
      <PaymentComponent />
    </div>
  );
}
