import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Separator } from './ui/separator';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  DollarSign,
  Eye,
  Edit,
  MoreHorizontal,
  ChevronDown,
  SortAsc,
  SortDesc
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Job {
  id: string;
  title: string;
  client: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  status: 'active' | 'closed' | 'pending' | 'in-progress';
  datePosted: string;
  description: string;
  proposals: number;
}

interface JobsListProps {
  onAddJob?: () => void;
  onViewJob?: (jobId: string) => void;
  onEditJob?: (jobId: string) => void;
}

export function JobsList({ onAddJob, onViewJob, onEditJob }: JobsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Job>('datePosted');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Mock job data
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Full-Stack Developer for E-commerce Platform',
      client: 'TechStart Inc.',
      budget: 8500,
      budgetType: 'fixed',
      status: 'active',
      datePosted: '2024-01-15',
      description: 'Looking for an experienced full-stack developer to build a modern e-commerce platform.',
      proposals: 12
    },
    {
      id: '2',
      title: 'React Developer - SaaS Dashboard',
      client: 'DataViz Solutions',
      budget: 85,
      budgetType: 'hourly',
      status: 'in-progress',
      datePosted: '2024-01-12',
      description: 'Need a React expert to develop interactive dashboard components.',
      proposals: 8
    },
    {
      id: '3',
      title: 'WordPress Website Redesign',
      client: 'Local Business Co.',
      budget: 2500,
      budgetType: 'fixed',
      status: 'closed',
      datePosted: '2024-01-10',
      description: 'Complete redesign of existing WordPress website with modern UI/UX.',
      proposals: 23
    },
    {
      id: '4',
      title: 'Mobile App Development - iOS & Android',
      client: 'FitTrack Startup',
      budget: 15000,
      budgetType: 'fixed',
      status: 'active',
      datePosted: '2024-01-08',
      description: 'Cross-platform mobile app for fitness tracking and social features.',
      proposals: 31
    },
    {
      id: '5',
      title: 'API Integration Specialist',
      client: 'CloudSync Systems',
      budget: 65,
      budgetType: 'hourly',
      status: 'pending',
      datePosted: '2024-01-05',
      description: 'Integrate multiple third-party APIs into existing platform.',
      proposals: 5
    },
    {
      id: '6',
      title: 'Vue.js Frontend Developer',
      client: 'Innovation Labs',
      budget: 4200,
      budgetType: 'fixed',
      status: 'active',
      datePosted: '2024-01-03',
      description: 'Frontend development for internal business tools using Vue.js.',
      proposals: 17
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'closed':
        return 'Closed';
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      default:
        return status;
    }
  };

  const formatBudget = (budget: number, type: 'fixed' | 'hourly') => {
    if (type === 'hourly') {
      return `$${budget}/hr`;
    }
    return `$${budget.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSort = (field: keyof Job) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.client.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      
      const matchesBudget = budgetFilter === 'all' || 
        (budgetFilter === 'under-1000' && job.budget < 1000) ||
        (budgetFilter === '1000-5000' && job.budget >= 1000 && job.budget < 5000) ||
        (budgetFilter === '5000-10000' && job.budget >= 5000 && job.budget < 10000) ||
        (budgetFilter === 'over-10000' && job.budget >= 10000);

      const matchesDate = dateFilter === 'all' ||
        (dateFilter === 'last-week' && new Date(job.datePosted) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
        (dateFilter === 'last-month' && new Date(job.datePosted) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

      return matchesSearch && matchesStatus && matchesBudget && matchesDate;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle different data types
      if (sortField === 'datePosted') {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [mockJobs, searchTerm, statusFilter, budgetFilter, dateFilter, sortField, sortDirection]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setBudgetFilter('all');
    setDateFilter('all');
  };

  const activeFiltersCount = [statusFilter, budgetFilter, dateFilter].filter(f => f !== 'all').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl">Jobs</h1>
            <p className="text-muted-foreground">
              Manage and track your job opportunities
            </p>
          </div>
          
          <Button onClick={onAddJob} className="leadcraft-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="leadcraft-shadow mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search jobs by title or client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm">Budget Range</Label>
                    <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Budgets</SelectItem>
                        <SelectItem value="under-1000">Under $1,000</SelectItem>
                        <SelectItem value="1000-5000">$1K - $5K</SelectItem>
                        <SelectItem value="5000-10000">$5K - $10K</SelectItem>
                        <SelectItem value="over-10000">$10K+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm">Date Posted</Label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Dates</SelectItem>
                        <SelectItem value="last-week">Last Week</SelectItem>
                        <SelectItem value="last-month">Last Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button variant="outline" onClick={clearFilters} className="w-full">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedJobs.length} of {mockJobs.length} jobs
          </p>
        </div>

        {/* Jobs Table */}
        <Card className="leadcraft-shadow">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('title')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Job Title
                      {sortField === 'title' && (
                        sortDirection === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('client')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Client
                      {sortField === 'client' && (
                        sortDirection === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('budget')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Budget
                      {sortField === 'budget' && (
                        sortDirection === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('status')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Status
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('datePosted')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Date Posted
                      {sortField === 'datePosted' && (
                        sortDirection === 'asc' ? <SortAsc className="ml-1 h-4 w-4" /> : <SortDesc className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground">No jobs found matching your criteria</p>
                        {activeFiltersCount > 0 && (
                          <Button variant="link" onClick={clearFilters} className="text-primary">
                            Clear filters to see all jobs
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedJobs.map((job) => (
                    <TableRow key={job.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{job.title}</p>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {job.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {job.proposals} proposals
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{job.client}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{formatBudget(job.budget, job.budgetType)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">
                          {job.budgetType} rate
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(job.status)} border`}
                        >
                          {getStatusLabel(job.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(job.datePosted)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onViewJob?.(job.id)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditJob?.(job.id)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Job
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}