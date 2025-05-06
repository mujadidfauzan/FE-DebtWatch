import React, { useState, useRef } from "react";
import { Input } from "../components/ui/input";
import { Switch } from "../components/ui/switch";
import { Button } from "../components/ui/button";
import { Camera, ArrowLeft, Plus } from "lucide-react";

const DetailPage: React.FC = () => {
  // Modes: summary, detail, edit
  const [mode, setMode] = useState<"summary" | "detail" | "edit">("summary");

  // User data state
  const [userData, setUserData] = useState({
    username: "John Smith",
    phone: "+44 555 5555 55",
    email: "example@example.com",
    age: 30,
    gender: "Laki-Laki",
    job: "desain",
    dependents: 8,
    assets: "rumah, tanah",
    activeDebt: "8",
    pushNotifications: true,
    darkTheme: false,
  });

  // Profile image state dan ref
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editable form state (for edit mode)
  const [formData, setFormData] = useState({ ...userData });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleToggleChange = (field: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditClick = () => {
    setMode("edit");
  };

  const handleUpdateClick = () => {
    setUserData({ ...formData });
    setMode("detail");
  };

  const handleViewDetailClick = () => {
    setMode("detail");
  };

  // Handler untuk upload gambar profil
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Account Settings View (Summary Mode - Yellow Background)
  if (mode === "summary") {
    return (
      <div className="flex flex-col h-screen bg-[#FFD600]">
        {/* Header */}
        <header className="p-4 flex items-center">
          <button className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-white text-xl font-medium mx-auto pr-6">Account Settings</h1>
        </header>

        {/* Profile content */}
        <div className="flex flex-col items-center px-6 pb-4">
          {/* Profile image */}
          <div className="relative w-24 h-24">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-2 border-white">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white">
                  <Camera className="h-8 w-8 text-gray-300" />
                </div>
              )}
            </div>
            
            {/* Tombol upload dengan icon plus */}
            <button 
              onClick={handleImageClick}
              className="absolute bottom-0 right-8 bg-blue-500 rounded-full p-1.5 shadow-md border-2 border-white"
            >
              <Plus className="h-4 w-4 text-white" />
            </button>
            
            {/* File input yang tersembunyi */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
            
            <div className="absolute bottom-0 right-0 bg-[#FFD600] text-white rounded-full p-1 border-2 border-white">
              <span className="text-xs font-bold">ID</span>
            </div>
          </div>
          
          <h2 className="font-medium text-lg mt-2">John Smith</h2>
          <p className="text-sm text-gray-700">ID: 25/03/0/24</p>
        </div>

        {/* White card for form */}
        <div className="w-full bg-white rounded-t-3xl p-6 flex-1">
          <h3 className="font-medium text-lg mb-4">Account Settings</h3>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <Input 
                value={userData.username}
                className="bg-[#EFF3F8] border-none"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <Input 
                value={userData.phone}
                className="bg-[#EFF3F8] border-none"
                disabled
              />
            </div>
            
            <div>
              <label className="block text-sm mb-1">Email Address</label>
              <Input 
                value={userData.email}
                className="bg-[#EFF3F8] border-none"
                disabled
              />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Push Notifications</span>
              <Switch 
                checked={userData.pushNotifications}
                onCheckedChange={(checked) => {
                  setUserData(prev => ({ ...prev, pushNotifications: checked }));
                }}
                className="data-[state=checked]:bg-[#FFD600]"
              />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Turn Dark Theme</span>
              <Switch 
                checked={userData.darkTheme}
                onCheckedChange={(checked) => {
                  setUserData(prev => ({ ...prev, darkTheme: checked }));
                }}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleViewDetailClick}
                className="w-full bg-[#FFD600] hover:bg-[#FFD600]/90 text-black rounded-full py-5"
              >
                Lihat Detail Profil
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Detail Profile View (Detail/Edit Mode - Blue Background)
  return (
    <div className="flex flex-col h-screen bg-[#2341DD]">
      {/* Header */}
      <header className="p-4 flex items-center">
        <button 
          className="text-white"
          onClick={() => setMode("summary")}
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white text-xl font-medium mx-auto pr-6">Detail Profil</h1>
      </header>

      {/* Form content */}
      <div className="flex-1 px-6 py-2 overflow-y-auto">
        <form className="space-y-4">
          <div>
            <label className="block text-white text-sm mb-1">User Name</label>
            <Input 
              value={mode === "edit" ? formData.username : userData.username}
              onChange={e => handleInputChange("username", e.target.value)}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">No. Telepon</label>
            <Input 
              value={mode === "edit" ? formData.phone : userData.phone}
              onChange={e => handleInputChange("phone", e.target.value)}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Alamat Email</label>
            <Input 
              type="email"
              value={mode === "edit" ? formData.email : userData.email}
              onChange={e => handleInputChange("email", e.target.value)}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Usia</label>
            <Input 
              type="number"
              value={mode === "edit" ? formData.age : userData.age}
              onChange={e => handleInputChange("age", Number(e.target.value))}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Jenis Kelamin</label>
            <Input 
              value={mode === "edit" ? formData.gender : userData.gender}
              onChange={e => handleInputChange("gender", e.target.value)}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Pekerjaan</label>
            <Input 
              value={mode === "edit" ? formData.job : userData.job}
              onChange={e => handleInputChange("job", e.target.value)}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Jumlah Tanggungan</label>
            <Input 
              type="number"
              value={mode === "edit" ? formData.dependents : userData.dependents}
              onChange={e => handleInputChange("dependents", Number(e.target.value))}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Aset Yang Dimiliki</label>
            <Input 
              value={mode === "edit" ? formData.assets : userData.assets}
              onChange={e => handleInputChange("assets", e.target.value)}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm mb-1">Hutang Aktif</label>
            <Input 
              value={mode === "edit" ? formData.activeDebt : userData.activeDebt}
              onChange={e => handleInputChange("activeDebt", e.target.value)}
              disabled={mode !== "edit"}
              className="bg-white border-none rounded-md"
            />
          </div>
          
          <div className="mt-6 pb-4">
            {mode === "detail" ? (
              <Button 
                onClick={handleEditClick}
                className="w-full bg-[#FFD600] hover:bg-[#FFD600]/90 text-black rounded-full py-5"
              >
                Edit Profil
              </Button>
            ) : (
              <Button 
                onClick={handleUpdateClick}
                className="w-full bg-[#FFD600] hover:bg-[#FFD600]/90 text-black rounded-full py-5"
              >
                Update Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailPage;
