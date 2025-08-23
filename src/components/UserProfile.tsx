import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  Edit, 
  Save, 
  X, 
  Camera, 
  Plus, 
  DollarSign, 
  Clock, 
  Star,
  MapPin,
  Calendar,
  Award
} from 'lucide-react';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

interface ProfileData {
  name: string;
  title: string;
  email: string;
  bio: string;
  skills: string[];
  availability: 'full-time' | 'part-time' | 'hourly';
  hourlyRate: string;
  fixedPriceMin: string;
  fixedPriceMax: string;
  location: string;
  experience: string;
  profileImage?: string;
}

export function UserProfile({ user }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  
  const [profileData, setProfileData] = useState<ProfileData>({
    name: user.name,
    title: 'Full-Stack Developer',
    email: user.email,
    bio: 'Passionate full-stack developer with 5+ years of experience in React, Node.js, and modern web technologies. I specialize in building scalable web applications and have a strong focus on user experience and clean code architecture.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'MongoDB', 'PostgreSQL', 'Next.js'],
    availability: 'full-time',
    hourlyRate: '75',
    fixedPriceMin: '5000',
    fixedPriceMax: '25000',
    location: 'San Francisco, CA',
    experience: '5+ years'
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'full-time':
        return 'Full-time';
      case 'part-time':
        return 'Part-time';
      case 'hourly':
        return 'Hourly';
      default:
        return 'Not specified';
    }
  };

  const currentData = isEditing ? editData : profileData;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl">Profile</h1>
            <p className="text-muted-foreground">
              Manage your professional profile and settings
            </p>
          </div>
          
          {!isEditing ? (
            <Button onClick={handleEdit} className="leadcraft-gradient">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="leadcraft-gradient">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture and Name */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={currentData.profileImage} />
                      <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4 text-center sm:text-left">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={editData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Professional Title</Label>
                          <Input
                            id="title"
                            placeholder="e.g., Full-Stack Developer"
                            value={editData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl">{currentData.name}</h2>
                        <p className="text-lg text-muted-foreground">{currentData.title}</p>
                        <div className="flex items-center justify-center sm:justify-start gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {currentData.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            {currentData.experience}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State/Country"
                        value={editData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Input
                        id="experience"
                        placeholder="e.g., 5+ years"
                        value={editData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {currentData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20"
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill} variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bio Card */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle>Bio & Work Style</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    placeholder="Tell clients about your experience, work style, and what makes you unique..."
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={6}
                  />
                ) : (
                  <p className="text-foreground leading-relaxed">{currentData.bio}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability Card */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Select
                    value={editData.availability}
                    onValueChange={(value: 'full-time' | 'part-time' | 'hourly') =>
                      handleInputChange('availability', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {getAvailabilityLabel(currentData.availability)}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing Card */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Pricing Model
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hourlyRate" className="text-sm font-medium">
                    Hourly Rate
                  </Label>
                  {isEditing ? (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-muted-foreground">$</span>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={editData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                        className="flex-1"
                      />
                      <span className="text-sm text-muted-foreground">/hour</span>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-primary mt-1">
                      ${currentData.hourlyRate}/hour
                    </p>
                  )}
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Fixed Price Range</Label>
                  {isEditing ? (
                    <div className="space-y-2 mt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">$</span>
                        <Input
                          placeholder="Min"
                          type="number"
                          value={editData.fixedPriceMin}
                          onChange={(e) => handleInputChange('fixedPriceMin', e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">$</span>
                        <Input
                          placeholder="Max"
                          type="number"
                          value={editData.fixedPriceMax}
                          onChange={(e) => handleInputChange('fixedPriceMax', e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg font-semibold text-primary mt-1">
                      ${parseInt(currentData.fixedPriceMin).toLocaleString()} - ${parseInt(currentData.fixedPriceMax).toLocaleString()}
                    </p>
                  )}
                  {!isEditing && (
                    <p className="text-xs text-muted-foreground mt-1">Project-based pricing</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            {!isEditing && (
              <Card className="leadcraft-shadow">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Profile Views</span>
                    <span className="font-semibold">247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-semibold">98%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Projects</span>
                    <span className="font-semibold">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Member Since</span>
                    <span className="font-semibold">Jan 2022</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Info Card */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="font-medium">{currentData.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Location</Label>
                  <p className="font-medium">{currentData.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}