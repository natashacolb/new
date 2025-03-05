import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, Upload, FileText, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postcode: z.string().min(5, { message: "Please enter a valid postcode." }),
  role: z.string({ required_error: "Please select a role." }),
  nmcNumber: z.string().optional(),
  dbsNumber: z.string().min(5, { message: "Please enter a valid DBS number." }),
  experience: z.string({
    required_error: "Please select your experience level.",
  }),
  professionalReferences: z
    .array(
      z.object({
        name: z.string().min(2, { message: "Reference name is required." }),
        position: z.string().min(2, { message: "Position is required." }),
        company: z.string().min(2, { message: "Company name is required." }),
        email: z
          .string()
          .email({ message: "Please enter a valid email address." }),
        phone: z
          .string()
          .min(10, { message: "Please enter a valid phone number." }),
        relationship: z
          .string()
          .min(2, { message: "Relationship is required." }),
      }),
    )
    .min(2, { message: "At least two professional references are required." }),
  rightToWork: z.object({
    method: z.string({
      required_error: "Please select a verification method.",
    }),
    passportNumber: z.string().optional(),
    nationality: z.string().optional(),
    visaStatus: z.string().optional(),
    visaExpiryDate: z.string().optional(),
    shareCode: z.string().optional(),
    document: z.any().optional(),
  }),
  resume: z.any().optional(),
  trainingCertificates: z.any().optional(),
  availability: z.object({
    weekdays: z.boolean().default(false).optional(),
    weekends: z.boolean().default(false).optional(),
    nights: z.boolean().default(false).optional(),
  }),
  qualifications: z.object({
    medicationTrained: z.boolean().default(false).optional(),
    movingHandling: z.boolean().default(false).optional(),
    firstAid: z.boolean().default(false).optional(),
    dementiaCare: z.boolean().default(false).optional(),
    other: z.boolean().default(false).optional(),
    otherDetails: z.string().optional(),
  }),
  emergencyContact: z.object({
    name: z.string().min(2, { message: "Emergency contact name is required." }),
    relationship: z.string().min(2, { message: "Relationship is required." }),
    phone: z
      .string()
      .min(10, { message: "Please enter a valid phone number." }),
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function CareWorkerRegistration() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [rightToWorkFile, setRightToWorkFile] = useState<File | null>(null);
  const [verificationMethod, setVerificationMethod] = useState<string>("");
  const [showNmcField, setShowNmcField] = useState(false);
  const [showOtherQualification, setShowOtherQualification] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const certificatesInputRef = useRef<HTMLInputElement>(null);
  const rightToWorkInputRef = useRef<HTMLInputElement>(null);
  const [references, setReferences] = useState([
    {
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
      relationship: "",
    },
    {
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
      relationship: "",
    },
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postcode: "",
      role: "",
      nmcNumber: "",
      dbsNumber: "",
      experience: "",
      professionalReferences: [
        {
          name: "",
          position: "",
          company: "",
          email: "",
          phone: "",
          relationship: "",
        },
        {
          name: "",
          position: "",
          company: "",
          email: "",
          phone: "",
          relationship: "",
        },
      ],
      rightToWork: {
        method: "",
        passportNumber: "",
        nationality: "",
        visaStatus: "",
        visaExpiryDate: "",
        shareCode: "",
        document: null,
      },
      resume: null,
      trainingCertificates: null,
      availability: {
        weekdays: false,
        weekends: false,
        nights: false,
      },
      qualifications: {
        medicationTrained: false,
        movingHandling: false,
        firstAid: false,
        dementiaCare: false,
        other: false,
        otherDetails: "",
      },
      emergencyContact: {
        name: "",
        relationship: "",
        phone: "",
      },
      termsAccepted: false,
    },
  });

  function nextStep() {
    if (step < 6) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  async function onSubmit(data: FormValues) {
    console.log("Form submission started");
    setIsSubmitting(true);
    try {
      // Generate a unique care worker ID
      const careWorkerId = `CW${Math.floor(1000 + Math.random() * 9000)}`;

      // First, check if the storage bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(
        (bucket) => bucket.name === "care-worker-documents",
      );

      if (!bucketExists) {
        await supabase.storage.createBucket("care-worker-documents", {
          public: false,
          allowedMimeTypes: [
            "image/png",
            "image/jpeg",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ],
          fileSizeLimit: 10485760, // 10MB
        });
      }

      // 1. Insert main care worker record
      const { data: careWorkerData, error: careWorkerError } = await supabase
        .from("care_workers")
        .insert({
          worker_id: careWorkerId,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postcode: data.postcode,
          role: data.role,
          nmc_number: data.nmcNumber || null,
          dbs_number: data.dbsNumber,
          experience: data.experience,
        })
        .select("id")
        .single();

      if (careWorkerError) {
        console.error("Error inserting care worker:", careWorkerError);
        throw careWorkerError;
      }

      const careWorkerId_db = careWorkerData.id;
      console.log("Care worker inserted with ID:", careWorkerId_db);

      // 2. Insert availability
      const { error: availabilityError } = await supabase
        .from("care_worker_availability")
        .insert({
          care_worker_id: careWorkerId_db,
          weekdays: data.availability.weekdays,
          weekends: data.availability.weekends,
          nights: data.availability.nights,
        });

      if (availabilityError) {
        console.error("Error inserting availability:", availabilityError);
        throw availabilityError;
      }

      // 3. Insert qualifications
      const { error: qualificationsError } = await supabase
        .from("care_worker_qualifications")
        .insert({
          care_worker_id: careWorkerId_db,
          medication_trained: data.qualifications.medicationTrained,
          moving_handling: data.qualifications.movingHandling,
          first_aid: data.qualifications.firstAid,
          dementia_care: data.qualifications.dementiaCare,
          other: data.qualifications.other,
          other_details: data.qualifications.otherDetails || null,
        });

      if (qualificationsError) {
        console.error("Error inserting qualifications:", qualificationsError);
        throw qualificationsError;
      }

      // 4. Insert references
      const referencesData = data.professionalReferences.map((ref) => ({
        care_worker_id: careWorkerId_db,
        name: ref.name,
        position: ref.position,
        company: ref.company,
        email: ref.email,
        phone: ref.phone,
        relationship: ref.relationship,
      }));

      const { error: referencesError } = await supabase
        .from("care_worker_references")
        .insert(referencesData);

      if (referencesError) {
        console.error("Error inserting references:", referencesError);
        throw referencesError;
      }

      // 5. Insert right to work information
      const { error: rightToWorkError } = await supabase
        .from("care_worker_right_to_work")
        .insert({
          care_worker_id: careWorkerId_db,
          method: data.rightToWork.method,
          passport_number: data.rightToWork.passportNumber || null,
          nationality: data.rightToWork.nationality || null,
          visa_status: data.rightToWork.visaStatus || null,
          visa_expiry_date: data.rightToWork.visaExpiryDate || null,
          share_code: data.rightToWork.shareCode || null,
        });

      if (rightToWorkError) {
        console.error("Error inserting right to work:", rightToWorkError);
        throw rightToWorkError;
      }

      // 6. Insert emergency contact
      const { error: emergencyContactError } = await supabase
        .from("care_worker_emergency_contacts")
        .insert({
          care_worker_id: careWorkerId_db,
          name: data.emergencyContact.name,
          relationship: data.emergencyContact.relationship,
          phone: data.emergencyContact.phone,
        });

      if (emergencyContactError) {
        console.error(
          "Error inserting emergency contact:",
          emergencyContactError,
        );
        throw emergencyContactError;
      }

      // 7. Handle file uploads if needed
      if (resumeFile) {
        try {
          const { error: resumeUploadError } = await supabase.storage
            .from("care-worker-documents")
            .upload(`${careWorkerId_db}/resume/${resumeFile.name}`, resumeFile);

          if (resumeUploadError) {
            console.error("Error uploading resume:", resumeUploadError);
            throw resumeUploadError;
          }
        } catch (uploadError) {
          console.error("Resume upload error:", uploadError);
          // Continue with registration even if file upload fails
        }
      }

      if (certificateFiles.length > 0) {
        for (const file of certificateFiles) {
          try {
            const { error: certificateUploadError } = await supabase.storage
              .from("care-worker-documents")
              .upload(`${careWorkerId_db}/certificates/${file.name}`, file);

            if (certificateUploadError) {
              console.error(
                "Error uploading certificate:",
                certificateUploadError,
              );
              // Continue with other files even if one fails
            }
          } catch (uploadError) {
            console.error("Certificate upload error:", uploadError);
            // Continue with other files
          }
        }
      }

      if (rightToWorkFile && data.rightToWork.method === "document_upload") {
        try {
          const { error: rightToWorkUploadError } = await supabase.storage
            .from("care-worker-documents")
            .upload(
              `${careWorkerId_db}/right-to-work/${rightToWorkFile.name}`,
              rightToWorkFile,
            );

          if (rightToWorkUploadError) {
            console.error(
              "Error uploading right to work document:",
              rightToWorkUploadError,
            );
            throw rightToWorkUploadError;
          }
        } catch (uploadError) {
          console.error("Right to work document upload error:", uploadError);
          // Continue with registration even if file upload fails
        }
      }

      console.log("Registration completed successfully with ID:", careWorkerId);
      alert(
        "Registration submitted successfully! Your worker ID is: " +
          careWorkerId,
      );
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        "Registration failed. Please try again: " + (error as Error).message,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4">
      <Card className="w-full bg-white shadow-lg border-2">
        <CardHeader className="bg-[linear-gradient(to_right,rgba(239,246,255,0.5),rgba(219,234,254,0.5))] p-6">
          <div className="flex items-center">
            <div className="bg-blue-50 p-2 rounded-lg">
              <UserPlus className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-2">
              <CardTitle className="text-2xl font-semibold">
                Care Worker Registration
              </CardTitle>
              <CardDescription className="text-sm text-neutral-500">
                Complete the form to register as a care worker
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap justify-between mt-6">
            {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex flex-col items-center mb-2 mx-1"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs mt-1 text-center">
                  {stepNumber === 1 && "Personal Info"}
                  {stepNumber === 2 && "Professional"}
                  {stepNumber === 3 && "References"}
                  {stepNumber === 4 && "Right to Work"}
                  {stepNumber === 5 && "Documents"}
                  {stepNumber === 6 && "Confirmation"}
                </span>
              </div>
            ))}
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-6 space-y-4">
              {step === 1 && (
                <div className="space-y-4 overflow-y-auto max-h-[60vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              autoComplete="given-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              autoComplete="family-name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john.doe@example.com"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="07123456789"
                              autoComplete="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="123 Main Street"
                            autoComplete="street-address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="London"
                              autoComplete="address-level2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postcode*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="SW1A 1AA"
                              autoComplete="postal-code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Professional Role*</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setShowNmcField(value === "registered_nurse");
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="registered_nurse">
                              Registered Nurse
                            </SelectItem>
                            <SelectItem value="care_assistant">
                              Care Assistant
                            </SelectItem>
                            <SelectItem value="senior_carer">
                              Senior Carer
                            </SelectItem>
                            <SelectItem value="healthcare_assistant">
                              Healthcare Assistant
                            </SelectItem>
                            <SelectItem value="support_worker">
                              Support Worker
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {showNmcField && (
                    <FormField
                      control={form.control}
                      name="nmcNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NMC Number*</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="12A3456B"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Required for Registered Nurses
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="dbsNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>DBS Certificate Number*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="001234567890"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="less_than_1">
                              Less than 1 year
                            </SelectItem>
                            <SelectItem value="1_to_2">1-2 years</SelectItem>
                            <SelectItem value="3_to_5">3-5 years</SelectItem>
                            <SelectItem value="5_to_10">5-10 years</SelectItem>
                            <SelectItem value="more_than_10">
                              More than 10 years
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-2">
                    <FormLabel>Availability</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="availability.weekdays"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Weekdays</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availability.weekends"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Weekends</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availability.nights"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Night Shifts</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel className="text-base font-medium">
                      Professional References
                    </FormLabel>
                    <FormDescription>
                      Please provide at least two professional references who
                      can vouch for your work experience and skills
                    </FormDescription>

                    {/* Reference 1 */}
                    <div className="mt-4 p-4 border border-slate-200 rounded-lg">
                      <h3 className="font-medium mb-3">Reference 1</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`professionalReferences.0.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Jane Smith"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`professionalReferences.0.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Care Home Manager"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name={`professionalReferences.0.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company/Organization*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Sunrise Care Home"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`professionalReferences.0.relationship`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Relationship*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Manager, Supervisor, etc."
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name={`professionalReferences.0.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="jane.smith@example.com"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`professionalReferences.0.phone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="07123456789"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Reference 2 */}
                    <div className="mt-4 p-4 border border-slate-200 rounded-lg">
                      <h3 className="font-medium mb-3">Reference 2</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`professionalReferences.1.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Brown"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`professionalReferences.1.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Position*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Senior Nurse"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name={`professionalReferences.1.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company/Organization*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Meadow View Care"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`professionalReferences.1.relationship`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Professional Relationship*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Colleague, Team Lead, etc."
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name={`professionalReferences.1.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="john.brown@example.com"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`professionalReferences.1.phone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="07987654321"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel className="text-base font-medium">
                      Right to Work Verification
                    </FormLabel>

                    <FormField
                      control={form.control}
                      name="rightToWork.method"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Verification Method*</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setVerificationMethod(value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select verification method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="share_code">
                                Share Code
                              </SelectItem>
                              <SelectItem value="document_upload">
                                Document Upload
                              </SelectItem>
                              <SelectItem value="passport_details">
                                Passport Details
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose how you want to verify your right to work in
                            the UK
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {verificationMethod === "share_code" && (
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="rightToWork.shareCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Share Code*</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="ABCD-EFGH-IJKL"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Enter the share code from the UK government's
                                online service
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {verificationMethod === "document_upload" && (
                      <div className="mt-4">
                        <FormLabel>Right to Work Document*</FormLabel>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                          <div className="text-center">
                            <FileText className="mx-auto h-12 w-12 text-gray-300" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                              <label
                                htmlFor="right-to-work-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="right-to-work-upload"
                                  name="right-to-work-upload"
                                  type="file"
                                  className="sr-only"
                                  ref={rightToWorkInputRef}
                                  onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                      setRightToWorkFile(e.target.files[0]);
                                      form.setValue(
                                        "rightToWork.document",
                                        e.target.files[0],
                                      );
                                    }
                                  }}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                              PDF, JPG, or PNG up to 10MB
                            </p>
                            {rightToWorkFile && (
                              <div className="mt-2 text-sm text-blue-600">
                                File selected: {rightToWorkFile.name}
                              </div>
                            )}
                          </div>
                        </div>
                        <FormDescription className="mt-2">
                          Upload a passport, BRP, visa, or other right to work
                          document
                        </FormDescription>
                      </div>
                    )}

                    {verificationMethod === "passport_details" && (
                      <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="rightToWork.passportNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Passport Number*</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123456789"
                                    autoComplete="off"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="rightToWork.nationality"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nationality*</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="British"
                                    autoComplete="off"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="rightToWork.visaStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Visa Status*</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select visa status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="british_citizen">
                                      British Citizen
                                    </SelectItem>
                                    <SelectItem value="settled_status">
                                      Settled Status
                                    </SelectItem>
                                    <SelectItem value="pre_settled_status">
                                      Pre-Settled Status
                                    </SelectItem>
                                    <SelectItem value="tier_2_visa">
                                      Tier 2 Visa
                                    </SelectItem>
                                    <SelectItem value="student_visa">
                                      Student Visa
                                    </SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="rightToWork.visaExpiryDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>
                                  Visa Expiry Date (if applicable)
                                </FormLabel>
                                <div className="relative">
                                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                  </div>
                                  <FormControl>
                                    <Input
                                      type="date"
                                      className="pl-10"
                                      autoComplete="off"
                                      {...field}
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <FormLabel className="text-base font-medium">
                        Resume/CV Upload
                      </FormLabel>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                        <div className="text-center">
                          <FileText className="mx-auto h-12 w-12 text-gray-300" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="resume-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="resume-upload"
                                name="resume-upload"
                                type="file"
                                className="sr-only"
                                ref={resumeInputRef}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setResumeFile(e.target.files[0]);
                                    form.setValue("resume", e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PDF, DOC, or DOCX up to 10MB
                          </p>
                          {resumeFile && (
                            <div className="mt-2 text-sm text-blue-600">
                              File selected: {resumeFile.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <FormLabel className="text-base font-medium">
                        Training Certificates
                      </FormLabel>
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-300" />
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="certificate-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                            >
                              <span>Upload files</span>
                              <input
                                id="certificate-upload"
                                name="certificate-upload"
                                type="file"
                                multiple
                                className="sr-only"
                                ref={certificatesInputRef}
                                onChange={(e) => {
                                  if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                  ) {
                                    const filesArray = Array.from(
                                      e.target.files,
                                    );
                                    setCertificateFiles(filesArray);
                                    form.setValue(
                                      "trainingCertificates",
                                      filesArray,
                                    );
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">
                            PDF, JPG, or PNG up to 10MB each
                          </p>
                          {certificateFiles.length > 0 && (
                            <div className="mt-2 text-sm text-blue-600">
                              {certificateFiles.length} file(s) selected
                              <ul className="list-disc list-inside mt-1 text-xs">
                                {certificateFiles.map((file, index) => (
                                  <li key={index}>{file.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <FormLabel>Qualifications & Training</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="qualifications.medicationTrained"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Medication Trained</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="qualifications.movingHandling"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Moving & Handling</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="qualifications.firstAid"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>First Aid</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="qualifications.dementiaCare"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Dementia Care</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="qualifications.other"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  setShowOtherQualification(!!checked);
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Other Qualification</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    {showOtherQualification && (
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="qualifications.otherDetails"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Other Qualification Details</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Please specify your other qualifications"
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <FormLabel className="text-base font-medium">
                      Emergency Contact Information
                    </FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <FormField
                        control={form.control}
                        name="emergencyContact.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jane Doe"
                                autoComplete="off"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="emergencyContact.relationship"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Relationship*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Spouse, Parent, etc."
                                autoComplete="off"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="emergencyContact.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Phone*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="07123456789"
                                autoComplete="off"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">
                      Registration Summary
                    </h3>
                    <p className="text-sm text-blue-700 mb-4">
                      Please review your information before submitting. You can
                      go back to make changes if needed.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-medium">Personal Information</h4>
                        <p>
                          Name: {form.getValues().firstName}{" "}
                          {form.getValues().lastName}
                        </p>
                        <p>Email: {form.getValues().email}</p>
                        <p>Phone: {form.getValues().phone}</p>
                        <p>
                          Address: {form.getValues().address},{" "}
                          {form.getValues().city}, {form.getValues().postcode}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium">Professional Details</h4>
                        <p>
                          Role:{" "}
                          {form.getValues().role &&
                            form
                              .getValues()
                              .role.replace("_", " ")
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1),
                              )
                              .join(" ")}
                        </p>
                        {form.getValues().nmcNumber && (
                          <p>NMC Number: {form.getValues().nmcNumber}</p>
                        )}
                        <p>DBS Number: {form.getValues().dbsNumber}</p>
                        <p>
                          Experience:{" "}
                          {form.getValues().experience &&
                            form.getValues().experience.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium">Professional References</h4>
                      {form
                        .getValues()
                        .professionalReferences.map((reference, index) => (
                          <div key={index} className="mb-2">
                            <p>
                              <strong>Reference {index + 1}:</strong>{" "}
                              {reference.name}, {reference.position}
                            </p>
                            <p>Company: {reference.company}</p>
                            <p>
                              Contact: {reference.email}, {reference.phone}
                            </p>
                          </div>
                        ))}
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium">Right to Work</h4>
                      <p>
                        Verification Method:{" "}
                        {form.getValues().rightToWork.method === "share_code"
                          ? "Share Code"
                          : form.getValues().rightToWork.method ===
                              "document_upload"
                            ? "Document Upload"
                            : form.getValues().rightToWork.method ===
                                "passport_details"
                              ? "Passport Details"
                              : ""}
                      </p>

                      {form.getValues().rightToWork.method === "share_code" && (
                        <p>
                          Share Code: {form.getValues().rightToWork.shareCode}
                        </p>
                      )}

                      {form.getValues().rightToWork.method ===
                        "document_upload" && (
                        <p>
                          Document:{" "}
                          {rightToWorkFile
                            ? rightToWorkFile.name
                            : "Not uploaded"}
                        </p>
                      )}

                      {form.getValues().rightToWork.method ===
                        "passport_details" && (
                        <>
                          <p>
                            Passport Number:{" "}
                            {form.getValues().rightToWork.passportNumber}
                          </p>
                          <p>
                            Nationality:{" "}
                            {form.getValues().rightToWork.nationality}
                          </p>
                          <p>
                            Visa Status:{" "}
                            {form.getValues().rightToWork.visaStatus &&
                              form
                                .getValues()
                                .rightToWork.visaStatus.replace(/_/g, " ")}
                          </p>
                          {form.getValues().rightToWork.visaExpiryDate && (
                            <p>
                              Visa Expiry:{" "}
                              {form.getValues().rightToWork.visaExpiryDate}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium">Documents</h4>
                      <p>
                        Resume: {resumeFile ? resumeFile.name : "Not uploaded"}
                      </p>
                      <p>
                        Training Certificates:{" "}
                        {certificateFiles.length > 0
                          ? `${certificateFiles.length} file(s) uploaded`
                          : "Not uploaded"}
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              Privacy Policy
                            </a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between p-6 border-t">
              <div className="w-full flex justify-between">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                ) : (
                  <div></div> /* Empty div for spacing when no Previous button */
                )}
                {step < 6 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Complete Registration"}
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
