import React from 'react';
import { useAuth, AuthProvider } from '@/lib/auth';
import { useState, useEffect } from 'react';

function DashboardContent() {
  const { user } = useAuth();
  const [visaChecks, setVisaChecks] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisaChecks([
        { id: 1, destination: 'France', date: '2026-06-10', status: 'approved' },
        { id: 2, destination: 'Japan', date: '2026-06-05', status: 'pending' },
        { id: 3, destination: 'Germany', date: '2026-05-20', status: 'approved' },
      ]);
      setDocuments([
        { id: 1, type: 'Visa Application', country: 'France', date: '2026-06-10' },
        { id: 2, type: 'Travel Itinerary', country: 'Japan', date: '2026-06-05' },
      ]);
      setApplications([
        { id: 1, country: 'France', visaType: 'Tourist', status: 'Submitted', date: '2026-06-10' },
        { id: 2, country: 'Japan', visaType: 'Business', status: 'In Progress', date: '2026-06-05' },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center bg-primary-500/20 rounded-full">
          {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.firstName}!</h1>
          <p className="text-sm text-foreground/50">Here's your personalized dashboard</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
          <h3 className="text-sm font-medium text-foreground/50">Visa Checks</h3>
          <p className="text-2xl font-bold text-foreground">{visaChecks.length}</p>
          <p className="text-xs text-foreground/40">This month</p>
        </div>
        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
          <h3 className="text-sm font-medium text-foreground/50">Documents Generated</h3>
          <p className="text-2xl font-bold text-foreground">{documents.length}</p>
          <p className="text-xs text-foreground/40">This month</p>
        </div>
        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
          <h3 className="text-sm font-medium text-foreground/50">Applications Tracked</h3>
          <p className="text-2xl font-bold text-foreground">{applications.length}</p>
          <p className="text-xs text-foreground/40">Active</p>
        </div>
        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
          <h3 className="text-sm font-medium text-foreground/50">Membership</h3>
          <p className="text-2xl font-bold text-foreground">{user.stats?.memberSince}</p>
          <p className="text-xs text-foreground/40">Member since</p>
        </div>
      </div>

      {/* Recent Activity */}
      {!loading && (
        <>
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Visa Checks */}
            <div className="bg-background/50 rounded-lg p-4 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-3">Recent Visa Checks</h3>
              {visaChecks.length > 0 ? (
                <div className="space-y-3">
                  {visaChecks.map((check) => (
                    <div key={check.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{check.destination}</p>
                        <p className="text-sm text-foreground/50">{new Date(check.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${check.status === 'approved' ? 'bg-success-100 text-success-800' : check.status === 'pending' ? 'bg-warning-100 text-warning-800' : 'bg-destroy-100 text-destroy-800'}`}>{check.status.charAt(0).toUpperCase() + check.status.slice(1)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-foreground/50 py-4">No recent visa checks</p>
              )}
            </div>

            {/* Documents */}
            <div className="bg-background/50 rounded-lg p-4 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-3">Recent Documents</h3>
              {documents.length > 0 ? (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{doc.type}</p>
                        <p className="text-sm text-foreground/50">{doc.country} • {new Date(doc.date).toLocaleDateString()}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">View</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-foreground/50 py-4">No recent documents</p>
              )}
            </div>

            {/* Applications */}
            <div className="bg-background/50 rounded-lg p-4 border border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-3">Tracked Applications</h3>
              {applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{app.country} {app.visaType} Visa</p>
                        <p className="text-sm text-foreground/50">{new Date(app.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${app.status === 'Submitted' ? 'bg-primary-100 text-primary-800' : app.status === 'In Progress' ? 'bg-warning-100 text-warning-800' : 'bg-success-100 text-success-800'}`}>{app.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-foreground/50 py-4">No tracked applications</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
