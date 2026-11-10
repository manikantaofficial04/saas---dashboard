import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  CalendarDays,
  Mail,
  Star,
  MoreHorizontal,
  Trash2,
  Pencil,
  X,
  ChevronDown,
} from "lucide-react";

import "./Invoice.css";

const initialInvoices = [
  {
    id: "#876364",
    name: "Arora gaur",
    email: "aroragaur@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete",
    color: "#eadcf7",
  },
  {
    id: "#876123",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
    color: "#ccebe8",
  },
  {
    id: "#876213",
    name: "Robert Bacins",
    email: "robertbacins@gmail.com",
    date: "09 Dec, 2020",
    status: "Complete",
    color: "#f8d5cc",
  },
  {
    id: "#876987",
    name: "Bethany Jackson",
    email: "bethanyjackson@gmail.com",
    date: "09 Dec, 2020",
    status: "Cancel",
    color: "#d7e8f7",
  },
  {
    id: "#871345",
    name: "Anne Jacob",
    email: "annejacob@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
    color: "#f5ddcf",
  },
  {
    id: "#872345",
    name: "Bethany jackson",
    email: "bethanyjackson@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
    color: "#e2f0c9",
  },
  {
    id: "#872346",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
    color: "#ccebf5",
  },
  {
    id: "#873245",
    name: "Jhon Deo",
    email: "jhondeo32@gmail.com",
    date: "08 Dec, 2020",
    status: "Complete",
    color: "#f4d5e5",
  },
  {
    id: "#876364",
    name: "Bethany jackson",
    email: "bethanyjackson@gmail.com",
    date: "02 Dec, 2020",
    status: "Cancel",
    color: "#ead8c9",
  },
  {
    id: "#878769",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "01 Dec, 2020",
    status: "Pending",
    color: "#e8c9f0",
  },
].map((invoice, index) => ({
  ...invoice,
  rowId: `invoice-${index + 1}`,
}));

function Invoice() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [search, setSearch] = useState("");
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    date: "",
    status: "Pending",
  });

  const filteredInvoices = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return invoices.filter((invoice) =>
      [
        invoice.id,
        invoice.name,
        invoice.email,
        invoice.date,
        invoice.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchValue)
    );
  }, [invoices, search]);

  // SELECT ALL INVOICES

  function toggleSelectAll(event) {
    if (event.target.checked) {
      setSelectedInvoices(
        filteredInvoices.map((invoice) => invoice.rowId)
      );
    } else {
      setSelectedInvoices([]);
    }
  }

  // SELECT SINGLE INVOICE

  function toggleSelect(rowId) {
    setSelectedInvoices((previous) =>
      previous.includes(rowId)
        ? previous.filter((id) => id !== rowId)
        : [...previous, rowId]
    );
  }

  // FAVORITE INVOICE

  function toggleFavorite(rowId) {
    setFavorites((previous) =>
      previous.includes(rowId)
        ? previous.filter((id) => id !== rowId)
        : [...previous, rowId]
    );
  }

  // DELETE INVOICE

  function deleteInvoice(rowId) {
    setInvoices((previous) =>
      previous.filter((invoice) => invoice.rowId !== rowId)
    );

    setSelectedInvoices((previous) =>
      previous.filter((id) => id !== rowId)
    );

    setActiveMenu(null);
  }

  // OPEN ADD MODAL

  function openAddModal() {
    setEditingInvoice(null);

    setFormData({
      id: "",
      name: "",
      email: "",
      date: "",
      status: "Pending",
    });

    setShowModal(true);
  }

  // OPEN EDIT MODAL

  function openEditModal(invoice) {
    setEditingInvoice(invoice);

    setFormData({
      id: invoice.id,
      name: invoice.name,
      email: invoice.email,
      date: invoice.date,
      status: invoice.status,
    });

    setShowModal(true);
    setActiveMenu(null);
  }

  // HANDLE FORM INPUTS

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // ADD OR UPDATE INVOICE

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.id.trim() ||
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.date.trim()
    ) {
      return;
    }

    if (editingInvoice) {
      setInvoices((previous) =>
        previous.map((invoice) =>
          invoice.rowId === editingInvoice.rowId
            ? { ...invoice, ...formData }
            : invoice
        )
      );
    } else {
      const newInvoice = {
        ...formData,
        rowId: `invoice-${Date.now()}`,
        color: "#e5ddf7",
      };

      setInvoices((previous) => [
        newInvoice,
        ...previous,
      ]);
    }

    setShowModal(false);
  }

  return (
    <div className="invoice-page">

      {/* PAGE HEADER */}

      <div className="invoice-header">
        <div>
          <h2>Invoice List</h2>
          <p>Manage and track all your invoices.</p>
        </div>

        <button
          className="add-invoice-btn"
          onClick={openAddModal}
        >
          <Plus size={18} />
          Add New
        </button>
      </div>

      {/* SEARCH */}

      <div className="invoice-toolbar">
        <div className="invoice-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search invoice..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>
      </div>

      {/* INVOICE TABLE */}

      <div className="invoice-table-wrapper">
        <table className="invoice-table">

          <thead>
            <tr>
              <th className="checkbox-column">
                <input
                  type="checkbox"
                  checked={
                    filteredInvoices.length > 0 &&
                    filteredInvoices.every((invoice) =>
                      selectedInvoices.includes(invoice.rowId)
                    )
                  }
                  onChange={toggleSelectAll}
                />
              </th>

              <th>
                <span className="table-heading">
                  Invoice Id
                  <ChevronDown size={14} />
                </span>
              </th>

              <th>
                <span className="table-heading">
                  Name
                  <ChevronDown size={14} />
                </span>
              </th>

              <th>
                <span className="table-heading">
                  Email
                  <ChevronDown size={14} />
                </span>
              </th>

              <th>
                <span className="table-heading">
                  Date
                  <ChevronDown size={14} />
                </span>
              </th>

              <th>
                <span className="table-heading">
                  Status
                  <ChevronDown size={14} />
                </span>
              </th>

              <th className="action-column">
                <Trash2 size={16} />
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredInvoices.map((invoice) => {
              const rowId = invoice.rowId;

              return (
                <tr key={rowId}>

                  {/* CHECKBOX */}

                  <td className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(rowId)}
                      onChange={() => toggleSelect(rowId)}
                    />
                  </td>

                  {/* INVOICE ID */}

                  <td className="invoice-id">
                    {invoice.id}
                  </td>

                  {/* CUSTOMER NAME */}

                  <td>
                    <div className="invoice-name">

                      <div
                        className="invoice-avatar"
                        style={{
                          backgroundColor: invoice.color,
                        }}
                      >
                        {invoice.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <span>{invoice.name}</span>

                    </div>
                  </td>

                  {/* EMAIL WITH GREEN ENVELOPE ICON */}

                  <td>
                    <div className="invoice-email">

                      <span className="email-icon">
                        <Mail size={19} />
                      </span>

                      <span>{invoice.email}</span>

                    </div>
                  </td>

                  {/* DATE */}

                  <td>
                    <div className="invoice-date">
                      <CalendarDays size={17} />
                      <span>{invoice.date}</span>
                    </div>
                  </td>

                  {/* STATUS */}

                  <td>
                    <span
                      className={`invoice-status ${invoice.status.toLowerCase()}`}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="invoice-actions">

                    <button
                      className={`favorite-btn ${
                        favorites.includes(rowId)
                          ? "favorited"
                          : ""
                      }`}
                      onClick={() => toggleFavorite(rowId)}
                      title="Favorite"
                    >
                      <Star size={17} />
                    </button>

                    <div className="invoice-menu-wrapper">

                      <button
                        className="invoice-menu-btn"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === rowId
                              ? null
                              : rowId
                          )
                        }
                        title="More options"
                      >
                        <MoreHorizontal size={19} />
                      </button>

                      {activeMenu === rowId && (
                        <div className="invoice-dropdown">

                          <button
                            onClick={() =>
                              openEditModal(invoice)
                            }
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            className="delete-option"
                            onClick={() =>
                              deleteInvoice(rowId)
                            }
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>

                        </div>
                      )}

                    </div>
                  </td>

                </tr>
              );
            })}

            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan="7" className="no-invoices">
                  No invoices found.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

      {/* ADD / EDIT INVOICE MODAL */}

      {showModal && (
        <div
          className="invoice-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="invoice-modal"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="invoice-modal-header">

              <h3>
                {editingInvoice
                  ? "Edit Invoice"
                  : "Add New Invoice"}
              </h3>

              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="invoice-form-group">
                <label>Invoice ID</label>

                <input
                  type="text"
                  name="id"
                  placeholder="#876364"
                  value={formData.id}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter customer name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label>Date</label>

                <input
                  type="text"
                  name="date"
                  placeholder="12 Dec, 2020"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="invoice-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Complete">
                    Complete
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Cancel">
                    Cancel
                  </option>
                </select>
              </div>

              <div className="invoice-modal-buttons">

                <button
                  type="button"
                  className="cancel-modal-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-invoice-btn"
                >
                  {editingInvoice
                    ? "Save Changes"
                    : "Add Invoice"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Invoice;