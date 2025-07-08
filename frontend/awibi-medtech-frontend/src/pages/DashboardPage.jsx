import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  Users,
  Calendar,
  Award,
  MapPin,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  Activity,
} from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  const getUserInitials = (user) => {
    if (!user) return 'U';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  const stats = [
    { label: 'Events Attended', value: '12', icon: Calendar, color: 'text-blue-600' },
    { label: 'Badges Earned', value: '8', icon: Award, color: 'text-yellow-600' },
    { label: 'Contribution Score', value: '450', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Chapter Members', value: '85', icon: Users, color: 'text-purple-600' },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'badge',
      title: 'Earned "Top Contributor" badge',
      time: '2 hours ago',
      icon: Award,
    },
    {
      id: 2,
      type: 'event',
      title: 'Attended AI in Healthcare Summit',
      time: '1 day ago',
      icon: Calendar,
    },
    {
      id: 3,
      type: 'chapter',
      title: 'Joined AMT Lagos Chapter',
      time: '3 days ago',
      icon: Users,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Telemedicine Workshop',
      date: '2024-02-20',
      location: 'Virtual',
      status: 'Registered',
    },
    {
      id: 2,
      title: 'Medical Device Innovation',
      date: '2024-03-01',
      location: 'Lagos, Nigeria',
      status: 'Interested',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening in your AWIBI MEDTECH community
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* User Profile Card */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user?.avatar} alt={user?.firstName} />
              <AvatarFallback className="text-lg">{getUserInitials(user)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Badge variant="secondary">{user?.role}</Badge>
                {user?.chapter && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {user.chapter.name}
                  </div>
                )}
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest activities and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <activity.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Events you're registered for or might be interested in
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(event.date).toLocaleDateString()} • {event.location}
                      </p>
                    </div>
                    <Badge 
                      variant={event.status === 'Registered' ? 'default' : 'secondary'}
                    >
                      {event.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Browse All Events
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

