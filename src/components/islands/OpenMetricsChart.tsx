import { TrendingUp, Archive, Users, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface OpenMetricsChartProps {
  className?: string;
  height?: number;
}

export default function OpenMetricsChart({
  className,
  height = 200
}: OpenMetricsChartProps = {}) {
  const [data, setData] = useState<Array<{ name: string; value: number }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching metrics data
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data - in a real implementation, this would come from an API
      const mockData = [
        { name: 'Visa Checks', value: 1245678 },
        { name: 'Documents Generated', value: 89234 },
        { name: 'Users Served', value: 156789 },
        { name: 'API Requests', value: 2345678 }
      ];

      setData(mockData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`w-full space-y-4 bg-background/50 rounded-lg p-6 border border-border/50 ${className}`}>
      <div className="flex items-start space-x-4 mb-4">
        <TrendingUp className="h-5 w-5 flex-shrink-0 text-primary-500 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Open Metrics
          </h3>
          <p className="text-sm text-foreground/50">
            Transparent statistics about our service usage
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="h-8 w-8 animate-spin border-4 border-primary-500 border-t-transparent rounded-full" />
          <p className="mt-2 text-sm text-foreground/50">Loading metrics...</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {data.map((metric, index) => (
              <div key={index} className="bg-background/80 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-6 w-6 flex-shrink-0 flex items-center justify-center bg-primary-500/20 text-primary-500">
                    {index === 0 && <TrendingUp className="h-4 w-4" />}
                    {index === 1 && <Archive className="h-4 w-4" />}
                    {index === 2 && <Users className="h-4 w-4" />}
                    {index === 3 && <Clock className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground/60">
                      {metric.name}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {metric.value.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Container */}
          <div className="bg-background/80 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Usage Overview
            </h3>
            <div className="h-[{height}px] relative">
              {/* Bar Chart */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border/50" />
              <div className="absolute bottom-0 left-0 right-0 h-0 bg-border/50 pointer-events-none">
                {data.map((metric, index) => {
                  const percentage = (metric.value / totalValue) * 100;
                  return (
                    <div
                      key={metric.name}
                      className={`absolute bottom-0 left-[${index * 25}%] w-[20%] ${percentage > 0 ? 'h-[${percentage}%]' : 'h-0'} bg-primary-500/20`}
                    >
                      {/* Tooltip */}
                      {percentage > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-xs bg-primary-500 text-primary-foreground whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                          {metric.name}: {metric.value.toLocaleString()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {/* Labels */}
              <div className="absolute bottom-0 left-0 right-0 h-8 flex items-start justify-between px-2">
                {data.map((metric, index) => (
                  <div key={metric.name} className="flex-1 text-center text-xs text-foreground/50">
                    {metric.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}