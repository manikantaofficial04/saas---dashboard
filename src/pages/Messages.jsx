import { useMemo, useState } from "react";
import {
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send,
  Image,
  FileText,
  Mic,
  Info,
  ArrowLeft,
  Check,
  CheckCheck,
  Plus,
  X,
} from "lucide-react";

import "./Messages.css";

const initialChats = [
  {
    id: 1,
    name: "Sophia Williams",
    email: "sophia.williams@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
    online: true,
    unread: 2,
    time: "10:42 AM",
    preview: "That sounds great!",
    messages: [
      {
        id: 1,
        text: "Hey! How are you doing?",
        time: "10:30 AM",
        sent: false,
      },
      {
        id: 2,
        text: "I'm doing good. How about you?",
        time: "10:32 AM",
        sent: true,
      },
      {
        id: 3,
        text: "I'm good too! Are we still working on the dashboard design?",
        time: "10:35 AM",
        sent: false,
      },
      {
        id: 4,
        text: "Yes! I've completed most of the main components.",
        time: "10:38 AM",
        sent: true,
      },
      {
        id: 5,
        text: "That sounds great!",
        time: "10:42 AM",
        sent: false,
      },
    ],
  },
  {
    id: 2,
    name: "Daniel Anderson",
    email: "daniel.anderson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    online: true,
    unread: 0,
    time: "09:45 AM",
    preview: "Can you share the latest update?",
    messages: [
      {
        id: 1,
        text: "Good morning! Any updates on the project?",
        time: "09:30 AM",
        sent: false,
      },
      {
        id: 2,
        text: "Yes, I'm working on the latest changes.",
        time: "09:35 AM",
        sent: true,
      },
      {
        id: 3,
        text: "Can you share the latest update?",
        time: "09:45 AM",
        sent: false,
      },
    ],
  },
  {
    id: 3,
    name: "Olivia Martinez",
    email: "olivia.martinez@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=44",
    online: false,
    unread: 1,
    time: "Yesterday",
    preview: "Thank you for your help!",
    messages: [
      {
        id: 1,
        text: "Could you help me with the new design?",
        time: "Yesterday",
        sent: false,
      },
      {
        id: 2,
        text: "Sure! Send me the details.",
        time: "Yesterday",
        sent: true,
      },
      {
        id: 3,
        text: "Thank you for your help!",
        time: "Yesterday",
        sent: false,
      },
    ],
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=13",
    online: true,
    unread: 0,
    time: "Yesterday",
    preview: "Let's discuss it tomorrow.",
    messages: [
      {
        id: 1,
        text: "We need to discuss the upcoming project.",
        time: "Yesterday",
        sent: false,
      },
      {
        id: 2,
        text: "Okay, let's discuss it tomorrow.",
        time: "Yesterday",
        sent: true,
      },
    ],
  },
  {
    id: 5,
    name: "Emma Johnson",
    email: "emma.johnson@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=49",
    online: false,
    unread: 0,
    time: "Monday",
    preview: "I have shared the documents.",
    messages: [
      {
        id: 1,
        text: "Have you checked the documents?",
        time: "Monday",
        sent: true,
      },
      {
        id: 2,
        text: "I have shared the documents.",
        time: "Monday",
        sent: false,
      },
    ],
  },
];

function Messages() {
  const [chats, setChats] = useState(initialChats);
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [showInfo, setShowInfo] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const selectedChat = chats.find(
    (chat) => chat.id === selectedChatId
  );

  const filteredChats = useMemo(() => {
    return chats.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [chats, search]);

  const totalUnread = chats.reduce(
    (total, chat) => total + chat.unread,
    0
  );

  const selectChat = (id) => {
    setSelectedChatId(id);
    setShowMobileChat(true);

    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === id ? { ...chat, unread: 0 } : chat
      )
    );
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: true,
    };

    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              preview: newMessage.text,
              time: "Just now",
            }
          : chat
      )
    );

    setMessage("");
  };

  if (!selectedChat) return null;

  return (
    <div className="messages-page">
      {/* Page Heading */}
      <div className="messages-heading">
        <div>
          <h2>Messages</h2>
          <p>
            Manage your conversations and stay connected with your team.
          </p>
        </div>

        <div className="messages-heading-right">
          <div className="messages-unread">
            <span></span>
            {totalUnread} unread messages
          </div>
        </div>
      </div>

      {/* Main Messages Layout */}
      <div className="messages-container">

        {/* LEFT: Conversation List */}
        <aside
          className={`conversation-panel ${
            showMobileChat ? "mobile-hidden" : ""
          }`}
        >
          <div className="conversation-header">
            <div>
              <h3>Messages</h3>
              <span>{chats.length} conversations</span>
            </div>

            <button className="new-chat-button" title="New message">
              <Plus size={19} />
            </button>
          </div>

          {/* Search */}
          <div className="conversation-search">
            <Search size={17} />

            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                <X size={15} />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="conversation-tabs">
            <button className="active">All</button>
            <button>Unread</button>
            <button>Groups</button>
          </div>

          {/* Conversation Items */}
          <div className="conversation-list">
            {filteredChats.length > 0 ? (
              filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  className={`conversation-item ${
                    selectedChatId === chat.id ? "selected" : ""
                  }`}
                  onClick={() => selectChat(chat.id)}
                >
                  <div className="conversation-avatar">
                    <img src={chat.avatar} alt={chat.name} />

                    {chat.online && (
                      <span className="online-indicator"></span>
                    )}
                  </div>

                  <div className="conversation-details">
                    <div className="conversation-top">
                      <h4>{chat.name}</h4>
                      <span className="conversation-time">
                        {chat.time}
                      </span>
                    </div>

                    <div className="conversation-bottom">
                      <p>{chat.preview}</p>

                      {chat.unread > 0 && (
                        <span className="unread-badge">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="no-conversations">
                No conversations found.
              </div>
            )}
          </div>
        </aside>

        {/* CENTER: Chat Window */}
        <section
          className={`chat-panel ${
            showMobileChat ? "mobile-active" : ""
          }`}
        >
          {/* Chat Header */}
          <div className="chat-header">
            <div className="chat-user-info">
              <button
                className="mobile-back-button"
                onClick={() => setShowMobileChat(false)}
              >
                <ArrowLeft size={20} />
              </button>

              <div className="chat-header-avatar">
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                />

                {selectedChat.online && (
                  <span className="online-indicator"></span>
                )}
              </div>

              <div>
                <h3>{selectedChat.name}</h3>
                <span>
                  {selectedChat.online ? "Active now" : "Offline"}
                </span>
              </div>
            </div>

            <div className="chat-header-actions">
              <button title="Voice call">
                <Phone size={19} />
              </button>

              <button title="Video call">
                <Video size={20} />
              </button>

              <button
                title="Contact information"
                className={showInfo ? "info-active" : ""}
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info size={19} />
              </button>

              <button title="More options">
                <MoreHorizontal size={21} />
              </button>
            </div>
          </div>

          {/* Chat Date */}
          <div className="chat-date-divider">
            <span>Today</span>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {selectedChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-row ${
                  msg.sent ? "sent" : "received"
                }`}
              >
                {!msg.sent && (
                  <img
                    className="message-avatar"
                    src={selectedChat.avatar}
                    alt=""
                  />
                )}

                <div className="message-content">
                  <div className="message-bubble">
                    {msg.text}
                  </div>

                  <div className="message-meta">
                    <span>{msg.time}</span>

                    {msg.sent && (
                      <CheckCheck size={14} className="message-read" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form className="message-input-area" onSubmit={sendMessage}>
            <div className="message-input-toolbar">
              <button type="button" title="Attach file">
                <Paperclip size={19} />
              </button>

              <button type="button" title="Add image">
                <Image size={19} />
              </button>

              <button type="button" title="Add document">
                <FileText size={19} />
              </button>

              <button type="button" title="Record audio">
                <Mic size={19} />
              </button>
            </div>

            <div className="message-input-box">
              <input
                type="text"
                placeholder="Type your message here..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />

              <button type="button" title="Emoji">
                <Smile size={20} />
              </button>

              <button
                type="submit"
                className="send-message-button"
                disabled={!message.trim()}
                title="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>

        {/* RIGHT: Contact Information */}
        {showInfo && (
          <aside className="contact-panel">
            <div className="contact-panel-heading">
              <h3>Contact Info</h3>

              <button
                className="close-contact-info"
                onClick={() => setShowInfo(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="contact-profile">
              <img
                src={selectedChat.avatar}
                alt={selectedChat.name}
              />

              <h3>{selectedChat.name}</h3>

              <span>
                {selectedChat.online ? "● Online" : "● Offline"}
              </span>

              <p>{selectedChat.email}</p>
            </div>

            <div className="contact-action-buttons">
              <button>
                <Phone size={18} />
                <span>Audio</span>
              </button>

              <button>
                <Video size={18} />
                <span>Video</span>
              </button>
            </div>

            <div className="contact-info-section">
              <div className="contact-section-title">
                <h4>About</h4>
              </div>

              <p>
                Working together to build amazing projects and
                experiences.
              </p>
            </div>

            <div className="contact-info-section">
              <div className="contact-section-title">
                <h4>Shared Media</h4>
                <span>0 files</span>
              </div>

              <div className="empty-media">
                <div>
                  <Image size={23} />
                </div>
                <p>No shared media yet</p>
              </div>
            </div>

            <div className="contact-info-section">
              <div className="contact-section-title">
                <h4>Shared Files</h4>
                <span>0 files</span>
              </div>

              <div className="empty-media">
                <div>
                  <FileText size={23} />
                </div>
                <p>No shared files yet</p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

export default Messages;