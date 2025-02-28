import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

interface RudrakshaCertificateProps {
  certificateNumber?: string
  issueDate?: string
  rudrakshType?: string
  labName?: string
  certificateImageUrl?: string
}

export function RudrakshaCertificate({
  certificateNumber = "RUD-2025-0228",
  issueDate = "February 28, 2025",
  rudrakshType = "5 Mukhi Rudraksha",
  labName = "International Rudraksha Laboratory",
  certificateImageUrl = "/placeholder.svg?height=600&width=450"
}: RudrakshaCertificateProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-amber-100">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Certificate Image */}
        <div className="md:w-2/5 bg-gradient-to-b from-amber-50 to-amber-100 p-6 flex items-center justify-center">
          <div className="relative w-full aspect-[3/4] max-w-md">
            <Image
              src={certificateImageUrl || "/placeholder.svg"}
              alt="Rudraksha Certificate"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right side - Certificate Details */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
          <Badge className="w-fit mb-2 bg-amber-100 text-amber-800 hover:bg-amber-200 hover:text-amber-900">
            Lab Verified
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Certificate of Authenticity
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-amber-700">
                Rishikesh&apos;s 1st & only ISO Certified
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-amber-800">
                Rudraksha Authentication
              </h3>
            </div>
            
            <div className="space-y-3 text-stone-700">
              <p className="flex justify-between border-b border-amber-100 pb-2">
                <span className="font-medium">Certificate Number:</span>
                <span>{certificateNumber}</span>
              </p>
              <p className="flex justify-between border-b border-amber-100 pb-2">
                <span className="font-medium">Issue Date:</span>
                <span>{issueDate}</span>
              </p>
              <p className="flex justify-between border-b border-amber-100 pb-2">
                <span className="font-medium">Rudraksha Type:</span>
                <span>{rudrakshType}</span>
              </p>
              <p className="flex justify-between border-b border-amber-100 pb-2">
                <span className="font-medium">Certified By:</span>
                <span>{labName}</span>
              </p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <p className="text-amber-800 font-medium">
                This certificate confirms that the Rudraksha has been tested and verified as 100% authentic by our laboratory using advanced scientific methods.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 relative">
                <Image 
                  src="/placeholder.svg?height=48&width=48" 
                  alt="Certification Seal" 
                  fill 
                  className="object-contain"
                />
              </div>
              <p className="text-amber-800 font-bold">
                100% Lifetime Money Back Authenticity Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
