"use client"

import React from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PricingTierProps {
  title: string;
  description: string;
  price: number;
  iconType: 'starter' | 'professional';
  isPopular?: boolean;
  validity:string;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  title, 
  description, 
  price, 
  iconType, 
  isPopular = false ,
  validity,
}) => {

    const router = useRouter()

    const handleSubscribe = async () => {
        try {
            let response = await fetch('http://localhost:4000/api/payment/subscribe?plan=pro');
            console.log(response,"asdhhhhhhhhhhhhhhhhhhfk")
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
    if (response.redirected) {
        // Stripe redirect detected
        router.push(response.url);
        return; // Exit here, no need to parse JSON
      }
            // let data = await response.json();
            // console.log(response.url,"ahfdkksssssssssss");
            // if(data.url){
            //     router.push(data.url);
            // }
          } catch (error) {
            console.error('Fetch error:', error);
          }
      };
      
      

  return (
    <div className={`w-full p-6 rounded-lg ${isPopular ? 'bg-teal-800' : 'bg-teal-800/20'}`}>
      <div className="w-36 h-36 bg-gray-100 rounded-lg p-6 mb-4">
        {iconType === 'starter' ? (
          <div className="flex flex-col h-full">
            <div className="flex h-1/2">
              <div className="w-1/2">
                <div className="flex flex-col-reverse h-full">
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                </div>
              </div>
              <div className="w-1/2"></div>
            </div>
            <div className="flex h-1/2">
              <div className="w-1/2 bg-teal-500"></div>
              <div className="w-1/2 rounded-tl-full bg-teal-500"></div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex h-1/2">
              <div className="w-1/2">
                <div className="flex flex-col-reverse h-full">
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                  <div className="h-1/4 bg-yellow-400"></div>
                </div>
              </div>
              <div className="w-1/2 flex items-start justify-end">
                <div className="w-4 h-4 rounded-full bg-teal-500"></div>
              </div>
            </div>
            <div className="flex h-1/2">
              <div className="w-1/2 bg-teal-500"></div>
              <div className="w-1/2 flex flex-col">
                <div className="h-1/2 rounded-tl-full bg-teal-500"></div>
                <div className="h-1/2 bg-yellow-400"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>

      <div className="flex items-baseline mb-8">
        <span className="text-5xl font-bold text-white">
          ${price}
        </span>
        <span className="ml-2 text-white">
          per / <span className='text-2xl font-bold'>{validity}</span>
        </span>
      </div>

      <button onClick={handleSubscribe} className="w-full bg-teal-700 text-white rounded py-3 px-4 hover:bg-teal-600 transition">
        Subscribe
      </button>
    </div>
  );
};

const PricingPage: NextPage = () => {



  return (
    <div className="min-h-screen bg-teal-500 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 justify-center">
       <div className='w-full'>
       <PricingTier
          title="Starter"
          description="Start with the basics - everything you need to get up and running with one project."
          price={99}
          iconType="starter"
          validity="month"
        />
       </div>
        
        <div className="relative w-full">
          <PricingTier
            title="Professional"
            description="Get all the starter benefits whilst enjoying the freedom to create unlimited team projects."
            price={299}
            iconType="professional"
            isPopular={true}
            validity="year"
            
          />
          <div className="absolute top-2 right-2 bg-white text-teal-800 text-xs px-2 py-1 rounded">
            Most popular
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;