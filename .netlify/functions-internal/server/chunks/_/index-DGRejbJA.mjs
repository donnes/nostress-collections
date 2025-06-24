import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { convexQuery } from '@convex-dev/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useLocation } from '@tanstack/react-router';
import { anyApi } from 'convex/server';
import { useQuery, useMutation } from 'convex/react';
import { XIcon, CheckIcon, EditIcon, ChevronDown, Check, ChevronUp } from 'lucide-react';
import { useQueryStates, parseAsBoolean, parseAsString as parseAsString$1 } from 'nuqs';
import * as React from 'react';
import { useCallback } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { T as Tooltip, a as TooltipTrigger, b as TooltipContent, c as cn } from './ssr.mjs';
import * as SelectPrimitive from '@radix-ui/react-select';
import { createLoader, parseAsArrayOf, parseAsString, parseAsStringEnum } from 'nuqs/server';
import { toast } from 'sonner';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools/production';
import '@tanstack/react-router-devtools';
import 'nuqs/adapters/react';
import '@radix-ui/react-tooltip';
import 'clsx';
import 'tailwind-merge';
import 'node:async_hooks';
import 'node:stream';
import 'react-dom/server';
import 'node:stream/web';

const api = anyApi;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Card = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    ...props
  }
));
Card.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const ITEM_OPTIONS = {
  MH: "Increase maximum life",
  MM: "Increase maximum mana",
  SD: "Increase maximum SD",
  DD: "Damage decrease",
  REF: "Reflect damage",
  DSR: "Defense success rate (PVM Only)",
  ZEN: "Increases zen drop rate"
};
const ITEM_PIECES = {
  helm: "Helm",
  armor: "Armor",
  pants: "Pants",
  gloves: "Gloves",
  boots: "Boots"
};
const searchParams = {
  searchSet: parseAsString,
  searchPiece: parseAsString,
  searchOptions: parseAsArrayOf(parseAsStringEnum(Object.keys(ITEM_OPTIONS)))
};
const loadSearchParams = createLoader(searchParams);
function AdvancedSearch({
  armorSets
}) {
  const [queryStates, setQueryStates] = useQueryStates(searchParams);
  function onClearSearch() {
    setQueryStates({
      searchSet: null,
      searchPiece: null,
      searchOptions: null
    });
  }
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "Busca avan\xE7ada" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Set" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: queryStates.searchSet || "",
            onValueChange: (value) => setQueryStates({ searchSet: value }),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Todos" }) }),
              /* @__PURE__ */ jsx(SelectContent, { className: "max-h-60", children: armorSets.map((set) => /* @__PURE__ */ jsx(SelectItem, { value: set.name, children: set.displayName }, set._id)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Parte do Set" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: queryStates.searchPiece || "",
            onValueChange: (value) => setQueryStates({ searchPiece: value }),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Qualquer" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { className: "max-h-60", children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "helm", children: "Helm" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "armor", children: "Armor" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "pants", children: "Pants" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "gloves", children: "Gloves" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "boots", children: "Boots" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Options" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1", children: Object.entries(ITEM_OPTIONS).map(([key, label]) => {
          var _a, _b;
          const isSelected = (_a = queryStates.searchOptions) == null ? void 0 : _a.includes(key);
          return /* @__PURE__ */ jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => {
                  var _a2;
                  setQueryStates({
                    searchOptions: isSelected ? (_a2 = queryStates.searchOptions) == null ? void 0 : _a2.filter(
                      (o) => o !== key
                    ) : [...queryStates.searchOptions || [], key]
                  });
                },
                variant: isSelected ? "default" : "outline",
                disabled: !isSelected && (((_b = queryStates.searchOptions) == null ? void 0 : _b.length) || 0) >= 4,
                children: key
              }
            ) }),
            /* @__PURE__ */ jsx(TooltipContent, { children: label })
          ] }, key);
        }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-end md:justify-end gap-2", children: /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: onClearSearch,
          variant: "outline",
          disabled: !queryStates.searchSet && !queryStates.searchPiece && !queryStates.searchOptions,
          children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            "Limpar"
          ]
        }
      ) })
    ] }) })
  ] });
}
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function CollectionTable({ players }) {
  const [queryStates, setQueryStates] = useQueryStates({
    player: parseAsString$1.withDefault(players[0]._id),
    editing: parseAsBoolean.withDefault(false)
  });
  const playerCollection = useQuery(api.guildCollections.getPlayerCollection, {
    playerId: queryStates.player
  });
  const upsertPlayerItemMutation = useMutation(
    api.guildCollections.upsertPlayerItem
  ).withOptimisticUpdate((localStore, args) => {
    const { playerId, setId, piece, options } = args;
    const currentCollection = localStore.getQuery(
      api.guildCollections.getPlayerCollection,
      { playerId }
    );
    if (currentCollection) {
      const updatedItems = currentCollection.items.map(
        (item) => item.setId === setId && item.piece === piece ? { ...item, options } : item
      );
      localStore.setQuery(
        api.guildCollections.getPlayerCollection,
        { playerId },
        {
          ...currentCollection,
          items: updatedItems
        }
      );
    }
    toast.success("Item atualizado");
  });
  const handleOptionToggle = useCallback(
    async (setId, piece, option) => {
      var _a;
      const existingItem = (_a = playerCollection == null ? void 0 : playerCollection.items) == null ? void 0 : _a.find(
        (item) => item.setId === setId && item.piece === piece
      );
      let currentOptions = (existingItem == null ? void 0 : existingItem.options) || [];
      const optionIndex = currentOptions.indexOf(option);
      if (optionIndex >= 0) {
        currentOptions.splice(optionIndex, 1);
      } else {
        if (currentOptions.length >= 4) {
          toast.error("Maximum 4 options allowed per item");
          return;
        }
        currentOptions.push(option);
      }
      await upsertPlayerItemMutation({
        playerId: queryStates.player,
        setId,
        piece,
        options: currentOptions
      });
    },
    [queryStates.player, playerCollection == null ? void 0 : playerCollection.items, upsertPlayerItemMutation]
  );
  const getItemOptions = useCallback(
    (setId, piece) => {
      var _a;
      const existingItem = (_a = playerCollection == null ? void 0 : playerCollection.items) == null ? void 0 : _a.find(
        (item) => item.setId === setId && item.piece === piece
      );
      return (existingItem == null ? void 0 : existingItem.options) || [];
    },
    [playerCollection == null ? void 0 : playerCollection.items]
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-foreground mb-2", children: "Selecionar jogador" }),
        /* @__PURE__ */ jsxs(
          Select,
          {
            value: queryStates.player,
            onValueChange: (value) => setQueryStates({ player: value }),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-64", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Choose a player" }) }),
              /* @__PURE__ */ jsx(SelectContent, { className: "max-h-80", children: players.map((player) => /* @__PURE__ */ jsx(SelectItem, { value: player._id, children: player.name }, player._id)) })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          onClick: () => setQueryStates({ editing: !queryStates.editing }),
          children: queryStates.editing ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(CheckIcon, { className: "size-4" }),
            "Finalizar"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(EditIcon, { className: "size-4" }),
            "Editar"
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(Table, { className: "border table-fixed", children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "bg-muted", children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Set" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Helm" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Armor" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Pants" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Gloves" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Boots" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: playerCollection == null ? void 0 : playerCollection.armorSets.map((set) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { children: set.displayName }),
        Object.keys(ITEM_PIECES).map((piece) => {
          var _a;
          const itemOptions = getItemOptions(set._id, piece);
          if ((_a = set.excludedPieces) == null ? void 0 : _a.includes(piece)) {
            return /* @__PURE__ */ jsx(
              TableCell,
              {
                className: "bg-[repeating-linear-gradient(45deg,#dc2626,#dc2626_10px,#450a0a_10px,#450a0a_20px)]",
                children: "\xA0"
              },
              `${set._id}-${piece}`
            );
          }
          if (queryStates.editing) {
            return /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-1", children: Object.entries(ITEM_OPTIONS).map(([key, label]) => {
              const isSelected = itemOptions.includes(key);
              return /* @__PURE__ */ jsxs(Tooltip, { children: [
                /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                  Button,
                  {
                    onClick: () => handleOptionToggle(set._id, piece, key),
                    variant: isSelected ? "default" : "outline",
                    size: "sm",
                    disabled: !isSelected && itemOptions.length >= 4,
                    children: key
                  }
                ) }),
                /* @__PURE__ */ jsx(TooltipContent, { children: label })
              ] }, key);
            }) }) }, `${set._id}-${piece}`);
          }
          if (itemOptions.length === 0) {
            return /* @__PURE__ */ jsx(TableCell, { children: "N/A" }, `${set._id}-${piece}`);
          }
          return /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-1", children: itemOptions.map((option) => {
            return /* @__PURE__ */ jsx(
              Button,
              {
                onClick: () => {
                },
                size: "sm",
                disabled: true,
                children: option
              },
              `${set._id}-${piece}-${option}`
            );
          }) }) }, `${set._id}-${piece}`);
        })
      ] }, set._id)) })
    ] })
  ] });
}
const SplitComponent = function Home() {
  var _a2, _b;
  var _a;
  const location = useLocation();
  const searchParams2 = loadSearchParams(location.search);
  const {
    data: armorSets
  } = useSuspenseQuery(convexQuery(api.guildCollections.getArmorSets, {}));
  const {
    data: players
  } = useSuspenseQuery(convexQuery(api.guildCollections.getPlayers, {}));
  const setId = (_a = armorSets.find((set) => set.name === searchParams2.searchSet)) == null ? void 0 : _a._id;
  useQuery(api.guildCollections.getSearchItems, {
    setId,
    piece: (_a2 = searchParams2.searchPiece) != null ? _a2 : void 0,
    options: (_b = searchParams2.searchOptions) != null ? _b : void 0
  });
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-2 text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 justify-center", children: [
        /* @__PURE__ */ jsx("img", { src: "/nostress.png", alt: "NoStress", className: "w-10 h-10" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-foreground", children: "NoStress - Collections" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Gerencie sua pr\xF3pria collection ou confira as collections dos demais membros da guild." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-4", children: [
      /* @__PURE__ */ jsx(AdvancedSearch, { armorSets }),
      /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsx(CollectionTable, { players }) }) })
    ] })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=index-DGRejbJA.mjs.map
