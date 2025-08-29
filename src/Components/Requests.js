import React, { useState } from "react";

// Dummy requests data
const requestsData = [
  {
    id: 1,
    organization: "Al-Amal Educational Foundation",
    title: "Al-Rabee Primary School",
    type: "Material (Financial Support)",
    date: "2025-08-10",
    status: "PENDING",
   
  },
  {
    id: 2,
    organization: "Hope Building Association",
    title: "Al-Noor Secondary School",
    type: "In-kind (School Supplies)",
    date: "2025-07-10",
    status: "PENDING",
    
  },
  {
    id: 3,
    organization: "School Volunteer Team",
    title: "Al-Mustaqbal Model School",
    type: "Volunteer (Teaching + Event Organization)",
    date: "2025-09-10",
    status: "PENDING",
   
  },
  {
    id: 4,
    organization: "Solutions Development Co.",
    title: "Al-Rayan Private School",
    type: "Material (Building Renovation)",
    date: "2025-06-10",
    status: "PENDING",
   
  },
  {
    id: 5,
    organization: "Student Support Initiative",
    title: "Success School for the Visually Impaired",
    type: "In-kind (Assistive Devices)",
    date: "2025-03-10",
    status: "PENDING",
  
  },
  {
    id: 6,
    organization: "Goodness & Development Association",
    title: "Early Childhood School",
    type: "Volunteer (Educational Workshops)",
    date: "2025-02-10",
    status: "PENDING",
   
  },



  // باقي الطلبات...
];

const statusOptions = ["PENDING", "IN_PROGRESS", "DONE", "DECLINED"];

function Requests() {
  const [requests, setRequests] = useState(requestsData);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    organization: "",
    type: "",
    date: "",
    description: "",
    contactName: "",
    contactPhone: "",
    images: [],
    video: null,
  });

  const handleStatusChange = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setRequests(updated);
  };

  const openModal = (req) => {
    setSelectedRequest(req);
    setUploadedImages([]);
    setUploadedVideo(null);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setUploadedImages(previews);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    const videoURL = URL.createObjectURL(file);
    setUploadedVideo(videoURL);
  };

  const handleNewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setNewRequest({ ...newRequest, images: previews });
  };

  const handleNewVideoUpload = (e) => {
    const file = e.target.files[0];
    const videoURL = URL.createObjectURL(file);
    setNewRequest({ ...newRequest, video: videoURL });
  };

  const handleAddRequest = () => {
    const newReq = {
      id: Date.now(),
      organization: newRequest.organization,
      title: newRequest.title,
      type: newRequest.type,
      date: newRequest.date,
      status: "PENDING",
      details: {
        description: newRequest.description,
        contact: {
          name: newRequest.contactName,
          phone: newRequest.contactPhone,
        },
        images: newRequest.images,
        video: newRequest.video,
      },
    };
    setRequests([newReq, ...requests]);
    setShowAddModal(false);
    setNewRequest({
      title: "",
      organization: "",
      type: "",
      date: "",
      description: "",
      contactName: "",
      contactPhone: "",
      images: [],
      video: null,
    });
  };

  const filteredRequests = requests.filter((req) =>
    req.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "PENDING").length;
  const acceptedRequests = requests.filter((r) => r.status === "DONE").length;
  const rejectedRequests = requests.filter((r) => r.status === "DECLINED").length;

  return (
    <div className="p-6 space-y-6">
      {/* Statistics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-100 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Total Requests</div>
          <div className="text-3xl font-semibold">12</div>
        </div>
        <div className="bg-green-100 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Pending Requests</div>
          <div className="text-3xl font-semibold">2</div>
        </div>
        <div className="bg-blue-100 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Accepted</div>
          <div className="text-3xl font-semibold">0</div>
        </div>
        <div className="bg-red-100 rounded-xl p-4 shadow">
          <div className="text-sm text-gray-500">Rejected</div>
          <div className="text-3xl font-semibold">0</div>
        </div>
      </div>

      {/* Add Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={() => setShowAddModal(true)}
      >
        ➕ Add Request
      </button>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by request title..."
        className="w-full p-2 border rounded mt-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border mt-4">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 border">Organization</th>
              <th className="p-3 border">Request Title</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id} className="text-center text-sm">
                <td className="p-3 border">{req.organization}</td>
                <td className="p-3 border">{req.title}</td>
                <td className="p-3 border">{req.type}</td>
                <td className="p-3 border">{req.date}</td>
                <td className="p-3 border">
                  <select
                    className="border px-2 py-1 rounded text-xs"
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => openModal(req)}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setSelectedRequest(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Details: {selectedRequest.title}</h2>
            <p className="mb-3 text-sm text-gray-700">
              <strong>Description:</strong> {selectedRequest.details.description}
            </p>
            <p className="mb-2 text-sm">
              <strong>Organization:</strong> {selectedRequest.organization}
            </p>
            <p className="mb-2 text-sm">
              <strong>Contact:</strong> {selectedRequest.details.contact.name} -{" "}
              {selectedRequest.details.contact.phone}
            </p>

            <div className="mb-4">
              <strong>Current Images:</strong>
              <div className="flex gap-2 mt-2 flex-wrap">
                {selectedRequest.details.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`img-${i}`}
                    className="w-24 h-24 rounded border object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm">Upload New Images:</label>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
              {uploadedImages.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {uploadedImages.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`preview-${i}`}
                      className="w-24 h-24 rounded object-cover border"
                    />
                  ))}
                </div>
              )}
            </div>

            {selectedRequest.details.video && (
              <div className="mb-4">
                <strong>Current Video:</strong>
                <video controls className="w-full mt-2 rounded">
                  <source src={selectedRequest.details.video} type="video/mp4" />
                </video>
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-1 text-sm">Upload New Video:</label>
              <input type="file" accept="video/*" onChange={handleVideoUpload} />
              {uploadedVideo && (
                <video controls className="w-full mt-2 rounded">
                  <source src={uploadedVideo} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Request Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-600"
              onClick={() => setShowAddModal(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Request</h2>

            <div className="space-y-3 text-sm">
              <input
                type="text"
                placeholder="Title"
                className="w-full border p-2 rounded"
                value={newRequest.title}
                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
              />
              <input
                type="text"
                placeholder="Organization"
                className="w-full border p-2 rounded"
                value={newRequest.organization}
                onChange={(e) => setNewRequest({ ...newRequest, organization: e.target.value })}
              />
              <input
                type="text"
                placeholder="Type (e.g. Material, Volunteer)"
                className="w-full border p-2 rounded"
                value={newRequest.type}
                onChange={(e) => setNewRequest({ ...newRequest, type: e.target.value })}
              />
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={newRequest.date}
                onChange={(e) => setNewRequest({ ...newRequest, date: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                rows="3"
                value={newRequest.description}
                onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Contact Name"
                className="w-full border p-2 rounded"
                value={newRequest.contactName}
                onChange={(e) => setNewRequest({ ...newRequest, contactName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Contact Phone"
                className="w-full border p-2 rounded"
                value={newRequest.contactPhone}
                onChange={(e) => setNewRequest({ ...newRequest, contactPhone: e.target.value })}
              />
              <div>
                <label className="block text-sm mb-1">Upload Images</label>
                <input type="file" multiple accept="image/*" onChange={handleNewImageUpload} />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {newRequest.images.map((img, i) => (
                    <img key={i} src={img} alt="preview" className="w-20 h-20 object-cover" />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Upload Video</label>
                <input type="file" accept="video/*" onChange={handleNewVideoUpload} />
                {newRequest.video && (
                  <video controls className="w-full mt-2 rounded">
                    <source src={newRequest.video} type="video/mp4" />
                  </video>
                )}
              </div>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded mt-4"
                onClick={handleAddRequest}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Statistic card component
function StatCard({ label, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center border">
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}

export default Requests;

