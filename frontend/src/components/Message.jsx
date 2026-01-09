const Message = ({ message, type }) => {
  return (
    <div className={`p-4 rounded-lg ${type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
      Welcome back! Manage your content, track performance, and grow your audience from here.
    </div>
  );
};

export default Message;