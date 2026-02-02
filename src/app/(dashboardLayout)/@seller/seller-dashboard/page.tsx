import React from "react";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Manage your products and view your activity.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors">
                  <div className="text-blue-600 font-medium">
                    Add New Product
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    List a new item for sale
                  </div>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
                  <div className="text-green-600 font-medium">View Orders</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Check recent purchases
                  </div>
                </button>
                <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
                  <div className="text-purple-600 font-medium">
                    Manage Inventory
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Update stock levels
                  </div>
                </button>
                <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-left transition-colors">
                  <div className="text-yellow-600 font-medium">Messages</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Customer inquiries
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">New order received</div>
                    <div className="text-sm text-gray-600">Order #ORD-7842</div>
                  </div>
                  <div className="text-sm text-gray-500">2 hours ago</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Product approved</div>
                    <div className="text-sm text-gray-600">
                      "Wireless Headphones"
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">1 day ago</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">Payment received</div>
                    <div className="text-sm text-gray-600">
                      $248.50 for 3 items
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">2 days ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Overview */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Overview
              </h2>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-gray-600">Active Listings</div>
                  <div className="text-2xl font-bold text-gray-800">--</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-600">Pending Orders</div>
                  <div className="text-2xl font-bold text-gray-800">--</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-gray-600">To be Shipped</div>
                  <div className="text-2xl font-bold text-gray-800">--</div>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Tips
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="text-green-500 mr-3">•</div>
                  <div className="text-sm text-gray-700">
                    Add clear photos for better sales
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-green-500 mr-3">•</div>
                  <div className="text-sm text-gray-700">
                    Respond to messages within 24 hours
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-green-500 mr-3">•</div>
                  <div className="text-sm text-gray-700">
                    Update stock regularly to avoid cancellations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
