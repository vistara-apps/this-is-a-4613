import React from 'react'

const StatsCard = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    purple: 'text-purple-400 bg-purple-400/10',
    blue: 'text-blue-400 bg-blue-400/10',
    green: 'text-green-400 bg-green-400/10',
    orange: 'text-orange-400 bg-orange-400/10',
  }

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-dark-text mb-1">{value}</h3>
        <p className="text-sm text-dark-muted mb-2">{title}</p>
        {trend && (
          <p className="text-xs text-green-400">{trend}</p>
        )}
      </div>
    </div>
  )
}

export default StatsCard