export const Loading = ({ text = 'Loading...' }) => {
    return (
        <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="ml-2 text-gray-600">{text}</span>
            </div>
        </div>
    );
};
