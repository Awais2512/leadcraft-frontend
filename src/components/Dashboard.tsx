import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Plus,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  Target
} from 'lucide-react';

interface Proposal {
  id: string;
  title: string;
  client: string;
  value: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  createdAt: string;
  deadline: string;
}

interface DashboardProps {
  user: {
    name: string;
    email: string;
    initials: string;
  };
  onCreateProposal?: () => void;
}

export function Dashboard({ user, onCreateProposal }: DashboardProps) {
  const [proposals] = useState<Proposal[]>([
    {
      id: '1',
      title: 'E-commerce Website Redesign',
      client: 'TechCorp Inc.',
      value: 15000,
      status: 'approved',
      createdAt: '2024-08-15',
      deadline: '2024-09-30'
    },
    {
      id: '2',
      title: 'Mobile App Development',
      client: 'StartupXYZ',
      value: 25000,
      status: 'sent',
      createdAt: '2024-08-18',
      deadline: '2024-10-15'
    },
    {
      id: '3',
      title: 'Brand Identity Package',
      client: 'Fashion Brand Co.',
      value: 8000,
      status: 'draft',
      createdAt: '2024-08-19',
      deadline: '2024-09-05'
    },
    {
      id: '4',
      title: 'WordPress Plugin Development',
      client: 'BlogMaster',
      value: 5000,
      status: 'rejected',
      createdAt: '2024-08-12',
      deadline: '2024-08-25'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="h-4 w-4" />;
      case 'sent':
        return <Eye className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-700 border-yellow-200 dark:text-yellow-400';
      case 'sent':
        return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:text-blue-400';
      case 'approved':
        return 'bg-green-500/10 text-green-700 border-green-200 dark:text-green-400';
      case 'rejected':
        return 'bg-red-500/10 text-red-700 border-red-200 dark:text-red-400';
      default:
        return 'bg-gray-500/10 text-gray-700 border-gray-200 dark:text-gray-400';
    }
  };

  const stats = [
    {
      title: 'Total Proposals',
      value: proposals.length,
      icon: <FileText className="h-5 w-5" />,
      description: 'All time'
    },
    {
      title: 'Success Rate',
      value: '75%',
      icon: <TrendingUp className="h-5 w-5" />,
      description: '+12% from last month'
    },
    {
      title: 'Total Value',
      value: '$53,000',
      icon: <DollarSign className="h-5 w-5" />,
      description: 'Proposals sent this year'
    },
    {
      title: 'Active Clients',
      value: '8',
      icon: <Users className="h-5 w-5" />,
      description: 'Currently working with'
    }
  ];

  const approvedProposals = proposals.filter(p => p.status === 'approved').length;
  const sentProposals = proposals.filter(p => p.status === 'sent').length;
  const draftProposals = proposals.filter(p => p.status === 'draft').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your proposals today.
            </p>
          </div>
          <Button onClick={onCreateProposal} className="leadcraft-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Create New Proposal
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="leadcraft-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                  </div>
                  <div className="text-primary">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Proposals List */}
          <div className="lg:col-span-2">
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Proposals
                  <Badge variant="secondary">{proposals.length} total</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="sent">Sent ({sentProposals})</TabsTrigger>
                    <TabsTrigger value="approved">Won ({approvedProposals})</TabsTrigger>
                    <TabsTrigger value="draft">Draft ({draftProposals})</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="space-y-4 mt-6">
                    {proposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(proposal.status)}>
                            {getStatusIcon(proposal.status)}
                            <span className="ml-1 capitalize">{proposal.status}</span>
                          </Badge>
                          <div>
                            <h4 className="font-medium">{proposal.title}</h4>
                            <p className="text-sm text-muted-foreground">{proposal.client}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">${proposal.value.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">
                              Due {new Date(proposal.deadline).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="sent" className="space-y-4 mt-6">
                    {proposals
                      .filter(p => p.status === 'sent')
                      .map((proposal) => (
                        <div
                          key={proposal.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(proposal.status)}>
                              {getStatusIcon(proposal.status)}
                              <span className="ml-1 capitalize">{proposal.status}</span>
                            </Badge>
                            <div>
                              <h4 className="font-medium">{proposal.title}</h4>
                              <p className="text-sm text-muted-foreground">{proposal.client}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${proposal.value.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">
                              Due {new Date(proposal.deadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="approved" className="space-y-4 mt-6">
                    {proposals
                      .filter(p => p.status === 'approved')
                      .map((proposal) => (
                        <div
                          key={proposal.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(proposal.status)}>
                              {getStatusIcon(proposal.status)}
                              <span className="ml-1 capitalize">{proposal.status}</span>
                            </Badge>
                            <div>
                              <h4 className="font-medium">{proposal.title}</h4>
                              <p className="text-sm text-muted-foreground">{proposal.client}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">${proposal.value.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">
                              Won on {new Date(proposal.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                  
                  <TabsContent value="draft" className="space-y-4 mt-6">
                    {proposals
                      .filter(p => p.status === 'draft')
                      .map((proposal) => (
                        <div
                          key={proposal.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <Badge className={getStatusColor(proposal.status)}>
                              {getStatusIcon(proposal.status)}
                              <span className="ml-1 capitalize">{proposal.status}</span>
                            </Badge>
                            <div>
                              <h4 className="font-medium">{proposal.title}</h4>
                              <p className="text-sm text-muted-foreground">{proposal.client}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-medium">${proposal.value.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">
                                Draft created {new Date(proposal.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Continue Editing
                            </Button>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Monthly Goals */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Monthly Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Proposals Sent</span>
                    <span>7/10</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Revenue Target</span>
                    <span>$35K/$50K</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Win Rate</span>
                    <span>75%/80%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Proposal approved by TechCorp Inc.</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Sent proposal to StartupXYZ</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Created draft for Fashion Brand Co.</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">Proposal declined by BlogMaster</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="leadcraft-shadow">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={onCreateProposal} className="w-full justify-start leadcraft-gradient">
                  <Plus className="h-4 w-4 mr-2" />
                  New Proposal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Browse Templates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Clients
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}