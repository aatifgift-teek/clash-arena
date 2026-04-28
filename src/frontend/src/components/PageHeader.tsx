interface PageHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  accent,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
      <div>
        <h1 className="font-display font-black text-2xl md:text-4xl uppercase tracking-tight text-foreground leading-none">
          {accent ? (
            <>
              <span className="text-primary">{accent}</span>{" "}
              <span>{title}</span>
            </>
          ) : (
            title
          )}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm mt-1.5 font-body">
            {subtitle}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
