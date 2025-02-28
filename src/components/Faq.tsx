import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { popping } from "@/utils/fonts"

export default function FAQ() {
  return (
    <div className={`container mx-auto px-6 py-12 text-center ${popping.className}`}>
      <h1 className="text-5xl font-normal mb-12">Frequently Asked Questions</h1>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="relative aspect-square w-80 lg:w-96">
          <Image
            src={"/images/banners/faq.jpg"}
            alt="FAQ decorative image with Rudraksha beads"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
        <div className="w-full max-w-2xl text-left">
          <h2 className="text-2xl font-medium mb-4 text-center lg:text-left">
            Quick Answers to Some Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg">What is Rudraksha?</AccordionTrigger>
              <AccordionContent className="text-base">
                Rudraksha is a sacred seed traditionally used for spiritual practices in Hinduism. These seeds come from
                Elaeocarpus ganitrus trees and are known for their distinctive appearance and believed spiritual properties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg">Why Nepa Rudraksha?</AccordionTrigger>
              <AccordionContent className="text-base">
                Nepalese Rudraksha is highly valued for its authenticity, quality, and spiritual significance. Nepal&apos;s
                climate and altitude create ideal conditions for growing the finest Rudraksha trees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg">Who Should wear Rudraksha?</AccordionTrigger>
              <AccordionContent className="text-base">
                Rudraksha can be worn by anyone seeking spiritual growth, peace, and positive energy. It&apos;s particularly
                beneficial for meditation practitioners and those interested in traditional healing practices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg">Rudraksha Certification and 100% Buy-Back Guarantee</AccordionTrigger>
              <AccordionContent className="text-base">
                Each Rudraksha comes with authentic certification verifying its quality and origin. We offer a 100%
                buy-back guarantee if you&apos;re not satisfied with your purchase, ensuring your investment is protected.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg">Shipping and Payment</AccordionTrigger>
              <AccordionContent className="text-base">
                We offer worldwide shipping with tracking. Multiple secure payment options are available, including
                credit cards and digital wallets. Standard shipping takes 5-7 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg">Why Buy Rudraksha directly from Nepal?</AccordionTrigger>
              <AccordionContent className="text-base">
                Buying directly from Nepal ensures authenticity, better prices, and supports local communities. You get
                access to the widest variety of genuine Rudraksha beads straight from the source.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg">What is the cost of shipping?</AccordionTrigger>
              <AccordionContent className="text-base">
                Shipping costs vary by location. We offer free shipping on orders above $100. Standard shipping rates
                start at $9.99. Express shipping options are available at additional cost.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex justify-center lg:justify-start mt-6 ">
            <Button variant="outline" className="
              text-amber-800 bg-transparent 
              hover:bg-amber-800 hover:text-white border-amber-800 text-lg px-6 py-3
            ">
              Get Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
