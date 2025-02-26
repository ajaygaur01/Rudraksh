import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function FAQ() {
  return (
    <div className="container mx-auto px-20 py-12">
      <h1 className="text-center text-4xl font-serif mb-12">Frequently Asked Question</h1>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-square max-w-md mx-auto lg:top-8">
          <Image
            src={"/images/banners/faq.jpg"}
            alt="FAQ decorative image with Rudraksha beads"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-xl font-medium mb-2">Quick Answers to Some Frequently Asked Questions.</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Rudraksha?</AccordionTrigger>
              <AccordionContent>
                Rudraksha is a sacred seed traditionally used for spiritual practices in Hinduism. These seeds come from
                Elaeocarpus ganitrus trees and are known for their distinctive appearance and believed spiritual
                properties.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Why Nepa Rudraksha?</AccordionTrigger>
              <AccordionContent>
                Nepalese Rudraksha is highly valued for its authenticity, quality, and spiritual significance. Nepal&apos;s
                climate and altitude create ideal conditions for growing the finest Rudraksha trees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Who Should wear Rudraksha?</AccordionTrigger>
              <AccordionContent>
                Rudraksha can be worn by anyone seeking spiritual growth, peace, and positive energy. It&apos;s particularly
                beneficial for meditation practitioners and those interested in traditional healing practices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Rudraksha Certification and 100% Buy-Back Guarantee</AccordionTrigger>
              <AccordionContent>
                Each Rudraksha comes with authentic certification verifying its quality and origin. We offer a 100%
                buy-back guarantee if you&apos;re not satisfied with your purchase, ensuring your investment is protected.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Shipping and Payment</AccordionTrigger>
              <AccordionContent>
                We offer worldwide shipping with tracking. Multiple secure payment options are available, including
                credit cards and digital wallets. Standard shipping takes 5-7 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Why Buy Rudraksha directly from Nepal?</AccordionTrigger>
              <AccordionContent>
                Buying directly from Nepal ensures authenticity, better prices, and supports local communities. You get
                access to the widest variety of genuine Rudraksha beads straight from the source.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>What is the cost of shipping?</AccordionTrigger>
              <AccordionContent>
                Shipping costs vary by location. We offer free shipping on orders above $100. Standard shipping rates
                start at $9.99. Express shipping options are available at additional cost.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Button variant="outline" className="mt-6">
            Get Support
          </Button>
        </div>
      </div>
    </div>
  )
}