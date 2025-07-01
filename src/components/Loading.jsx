const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-100">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-base-content mb-2">Loading...</h3>
          <p className="text-base-content/70 text-sm">Please wait while we prepare your content</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
