import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export function FooterStat() {
  return (
    <section className="grid grid-cols-3 grid-rows-1 gap-4 mt-8 md:mt-0">
      <Item className="bg-primary/5 text-primary text-center rounded-xl">
        <ItemContent>
          <ItemTitle className="mx-auto font-bold text-2xl">8.4K</ItemTitle>
          <ItemDescription>
            Pemilih <br />
            Terdaftar
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item className="bg-primary/5 text-primary text-center rounded-xl">
        <ItemContent>
          <ItemTitle className="mx-auto font-bold text-2xl">63%</ItemTitle>
          <ItemDescription>
            Sudah <br />
            Memilih
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item className="bg-primary/5 text-primary text-center rounded-xl">
        <ItemContent>
          <ItemTitle className="mx-auto font-bold text-2xl">5</ItemTitle>
          <ItemDescription>
            Paslon <br />
            Terdaftar
          </ItemDescription>
        </ItemContent>
      </Item>
    </section>
  );
}
