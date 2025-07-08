import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Users,
  Calendar,
  Award,
  MapPin,
  ArrowRight,
  Play,
  CheckCircle,
  Globe,
  Heart,
  Lightbulb,
} from 'lucide-react';
import heroImage from '../assets/doctor-patient-and-black-man-with-tablet-hospita-2023-11-27-05-04-20-utc.png';
import illustrationImage from '../assets/Illustration.png';

const HomePage = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Chapters', value: '50+', icon: MapPin },
    { label: 'Community Members', value: '5,000+', icon: Users },
    { label: 'Events Hosted', value: '200+', icon: Calendar },
    { label: 'Badges Earned', value: '1,500+', icon: Award },
  ];

  const features = [
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with healthcare professionals and innovators worldwide',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Collaborate on cutting-edge medical technology solutions',
    },
    {
      icon: Award,
      title: 'Recognition System',
      description: 'Earn badges and certifications for your contributions',
    },
    {
      icon: Heart,
      title: 'Impact Driven',
      description: 'Make a real difference in healthcare accessibility',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'AI in Healthcare Summit 2024',
      date: '2024-02-15',
      location: 'Virtual',
      attendees: 250,
      type: 'Summit',
    },
    {
      id: 2,
      title: 'Telemedicine Workshop',
      date: '2024-02-20',
      location: 'Lagos, Nigeria',
      attendees: 80,
      type: 'Workshop',
    },
    {
      id: 3,
      title: 'Medical Device Innovation Hackathon',
      date: '2024-03-01',
      location: 'Abuja, Nigeria',
      attendees: 120,
      type: 'Hackathon',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  🚀 Transforming Healthcare Through Technology
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Advancing
                  <span className="text-blue-600"> Medical Technology</span>
                  <br />
                  Together
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join a global community of healthcare professionals, innovators, and students 
                  working together to revolutionize medical technology and improve healthcare accessibility.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                  onClick={() => navigate('/register')}
                >
                  Join Our Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3"
                  onClick={() => navigate('/chapters')}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Explore Chapters
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImage}
                alt="Healthcare Technology"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">50+ Active Chapters</div>
                    <div className="text-sm text-gray-600">Across 20+ Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Join AWIBI MEDTECH?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Be part of a movement that's shaping the future of healthcare through 
              innovation, collaboration, and technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-xl text-gray-600">
                Join our community events and expand your network
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/events')}
              className="hidden sm:flex"
            >
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary">{event.type}</Badge>
                    <div className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      {event.attendees} attendees
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Button
              variant="outline"
              onClick={() => navigate('/events')}
            >
              View All Events
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl text-blue-100">
              Join thousands of healthcare professionals and innovators who are 
              already transforming the future of medical technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="px-8 py-3"
                onClick={() => navigate('/register')}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate('/chapters')}
              >
                Find Your Chapter
                <Globe className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

