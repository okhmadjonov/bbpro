import { notFoundImage } from "@/Assets/Images";
import { Button } from "@/ui";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Custom404() {
  return (
    <div className="not_found_page">
      <Image src={notFoundImage} alt="not_found" />
      <h2>Неправипьно наоранагресипитакемотраницы не существует</h2>
      <Link href={"/"}>
        <Button type="primary" label={"Back Home"} />
      </Link>
    </div>
  );
}
