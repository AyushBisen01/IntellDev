'use client'
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const App: React.FC = () => {
  const [role, setRole] = useState("student");
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-[1440px] min-h-[1024px] flex flex-col items-center justify-center">
        <div className="w-full max-w-md mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome</h1>
          <p className="text-gray-500">Join our learning community as a mentor or student</p>
            </div>

        <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-center mb-2">Authentication</h2>
          <p className="text-gray-500 text-center mb-6">Choose your role and sign in or create an account</p>

          <Tabs defaultValue="signin" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="!rounded-button whitespace-nowrap cursor-pointer">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="!rounded-button whitespace-nowrap cursor-pointer">Sign Up</TabsTrigger>
              </TabsList>
            
            <TabsContent value="signin">
              <div className="space-y-6">
                <div>
                  <p className="font-medium mb-4">I am a:</p>
                  <RadioGroup defaultValue="student" className="flex gap-8" onValueChange={setRole}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student" className="flex items-center cursor-pointer">
                        <i className="fas fa-user-graduate mr-2"></i> Student
                      </Label>
                </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mentor" id="mentor" />
                      <Label htmlFor="mentor" className="flex items-center cursor-pointer">
                        <i className="fas fa-chalkboard-teacher mr-2"></i> Mentor
                      </Label>
                </div>
                  </RadioGroup>
              </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full border-gray-300 text-sm"
                  />
                  </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                        <Input
                    id="password" 
                    type="password" 
                    placeholder="Enter your password"
                    className="w-full border-gray-300 text-sm"
                  />
                      </div>

            <Button
                  className="w-full bg-black hover:bg-gray-800 text-white !rounded-button whitespace-nowrap cursor-pointer"
                              onClick={() => {
                    if (role === 'student') router.push('/auth'); 
                    else if (role === 'mentor') router.push('/Mentor_dashboard'); 
                  }}
                >
                  Sign in as {role}
                            </Button>
                          </div>
            </TabsContent>
            
            <TabsContent value="signup">
              <div className="space-y-6">
              <div>
                  <p className="font-medium mb-4">I am a:</p>
                  <RadioGroup defaultValue="student" className="flex gap-8" onValueChange={setRole}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student-signup" />
                      <Label htmlFor="student-signup" className="flex items-center cursor-pointer">
                        <i className="fas fa-user-graduate mr-2"></i> Student
                      </Label>
                </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mentor" id="mentor-signup" />
                      <Label htmlFor="mentor-signup" className="flex items-center cursor-pointer">
                        <i className="fas fa-chalkboard-teacher mr-2"></i> Mentor
                      </Label>
              </div>
                  </RadioGroup>
                        </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                              <Input
                    id="name" 
                                type="text"
                    placeholder="Enter your full name"
                    className="w-full border-gray-300 text-sm"
                  />
                        </div>

                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <Input 
                    id="email-signup" 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full border-gray-300 text-sm"
                  />
                        </div>

                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                <Input
                    id="password-signup" 
                    type="password" 
                    placeholder="Enter your password"
                    className="w-full border-gray-300 text-sm"
                  />
                </div>

                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={() => { 
                    if (role === 'student') router.push('/auth'); 
                    else if (role === 'mentor') router.push('/Mentor_dashboard'); 
                  }}
                >
                  Create account as {role}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
            </div>
          </div>
    </div>
  );
}

export default App;
