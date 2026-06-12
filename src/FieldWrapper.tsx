function FieldWrapper({
  supported = true,
  message,
  children
}) {
  return (
    <div className="relative group flex flex-col gap-1">

      {!supported && (
        <div className="absolute right-2 top-2 z-50">

          {/* BADGE */}
          <span className="
            unsupported-badge
            relative
            z-10
            rounded-full
            px-2 py-1
            text-xs
            font-medium
            block
          ">
            Unsupported
          </span>

          {/* TOOLTIP */}
          <div className="
            field-tooltip
            absolute
            right-0
            top-0
            -translate-y-full
            mb-2

            w-64
            rounded-lg
            px-3 py-2
            text-xs

            opacity-0
            scale-95
            transition-all
            duration-200

            group-hover:opacity-100
            group-hover:scale-100

            z-999;
          ">
            {message}
          </div>

        </div>
      )}

      {children}
    </div>
  );
}

export default FieldWrapper;